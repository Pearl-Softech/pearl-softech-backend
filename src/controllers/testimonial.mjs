const addTestimonial = async (req, res) => {
    try {
      const testimonial = new Testimonial(req.body);
      await testimonial.save();
      res.status(201).json({ success: true, message: 'Testimonial added successfully', data: testimonial });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error adding testimonial', error: error.message });
    }
  };

  const getAllTestimonials = async (req, res) => {
    try {
      const testimonials = await Testimonial.find().sort({ created_at: -1 });
      res.status(200).json({ success: true, data: testimonials });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching testimonials', error: error.message });
    }
  };

  const getTestimonialById = async (req, res) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
  
      res.status(200).json({ success: true, data: testimonial });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching testimonial', error: error.message });
    }
  };

  const deleteTestimonial = async (req, res) => {
    try {
      const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
      if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
  
      res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting testimonial', error: error.message });
    }
  };


  export { addTestimonial, getAllTestimonials, getTestimonialById, deleteTestimonial }
  
  