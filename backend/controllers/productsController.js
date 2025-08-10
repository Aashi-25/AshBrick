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

    if (!name || !price || !quantity_available || !location || !supplier_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify supplier_id exists in auth.users
    const { data: user, error: userError } = await supabase
      .from('auth.users')
      .select('id')
      .eq('id', supplier_id)
      .single();

    if (userError || !user) {
      console.error('User fetch error:', userError);
      return res.status(400).json({ error: `Invalid supplier_id: ${supplier_id} not found in auth.users` });
    }

    // Verify supplier_id matches authenticated user's ID and role
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

    // Upload lab report to Supabase Storage if provided
    let labReportUrl = null;
    if (req.file) {
      const fileName = `${supplier_id}/${Date.now()}_${req.file.originalname}`;
      console.log('Uploading lab report:', fileName);
      const { error: uploadError } = await supabase.storage
        .from('lab-reports')
        .upload(fileName, req.file.buffer, {
          contentType: 'application/pdf',
        });
      if (uploadError) {
        console.error('File upload error:', uploadError);
        return res.status(500).json({ error: `Failed to upload lab report: ${uploadError.message}` });
      }
      const { data: urlData } = supabase.storage
        .from('lab-reports')
        .getPublicUrl(fileName);
      labReportUrl = urlData.publicUrl;
      console.log('Lab report URL:', labReportUrl);
    }

    // Insert product into Supabase
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
          lab_report_url: labReportUrl,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      if (error.message.includes('foreign key')) {
        return res.status(400).json({ error: `Foreign key violation: ${error.message}` });
      }
      return res.status(500).json({ error: `Failed to create product: ${error.message}` });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
};