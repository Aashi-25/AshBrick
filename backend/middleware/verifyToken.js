import { con as supabase } from "../db/supabasesClients.js";

export const verifyToken = async (req, res, next) => {
  try {
   
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);

    
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return res.status(401).json({ error: 'User profile not found' });
    }

    
    req.user = user;
    req.profile = profile;
    req.userId = user.id;
    req.userRole = profile.role;

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ error: 'Server error during authentication' });
  }
};


export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(401).json({ error: 'No role found' });
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ 
        error: `Access denied. Required role: ${roles.join(' or ')}` 
      });
    }

    next();
  };
};

export const requireAdmin = (req, res, next) => {
  if (req.userRole !== 'Admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};


export const requireSupplier = (req, res, next) => {
  if (req.userRole !== 'Supplier') {
    return res.status(403).json({ error: 'Supplier access required' });
  }
  next();
};

export const requireBuyer = (req, res, next) => {
  if (req.userRole !== 'Buyer') {
    return res.status(403).json({ error: 'Buyer access required' });
  }
  next();
};
