// backend/controllers/productsController.js
import { con as supabase } from '../db/supabasesClients.js';

export const getAllProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Supabase fetch error:', error);
      return res.status(500).json({ error: `Failed to fetch products: ${error.message}` });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
};

export const createProduct = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    console.log('Authenticated user:', req.userId, req.userRole);

    const {
      name,
      description,
      price,
      quantity_available,
      location,
      supplier_id,
    } = req.body;
    const labReport = req.file ? req.file.path : null;

    if (!name || !price || !quantity_available || !location || !supplier_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify supplier_id matches authenticated user's profile id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, role')
      .eq('id', req.userId)
      .single();

    if (profileError || !profile) {
      console.error('Profile fetch error:', profileError);
      return res.status(403).json({ error: 'Unauthorized: Profile not found' });
    }

    if (profile.id !== supplier_id || profile.role !== 'Supplier') {
      return res.status(403).json({ error: 'Unauthorized: Invalid supplier_id or role' });
    }

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          description,
          price: parseFloat(price),
          quantity_available: parseInt(quantity_available),
          location,
          supplier_id,
          lab_report_url: labReport,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: `Failed to create product: ${error.message}` });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
};