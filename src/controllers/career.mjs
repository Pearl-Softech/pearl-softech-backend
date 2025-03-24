import Career from "../models/career.mjs";

const getCareers = async (req, res) => {
    try {
        const careers = await Career.find();
        return res.status(200).json({ type: "success", careers });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            type: "error",
            message: 'Server error: Please try again later or contact devrajeshthapa@gmail.com to resolve this issue'
        });
    }
};

const getCareer = async (req, res) => {
    const { id } = req.params;
    try {
        const career = await Career.findById(id);
        if (!career) {
            return res.status(404).json({ type: "error", message: 'Career not found' });
        }
        return res.status(200).json({ type: "success", career });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            type: "error",
            message: 'Server error: Please try again later or contact devrajeshthapa@gmail.com to resolve this issue'
        });
    }
};

const addCareer = async (req, res) => {
    const {
        title,
        description,
        deadline,
        qualification,
        requiredSkills,
        tags,
        type,
        workMode,
        jobLevel,
        salary
    } = req.body;

    try {
        const career = new Career({
            title,
            description,
            deadline,
            qualification,
            requiredSkills,
            tags,
            type,
            workMode,
            jobLevel,
            salary
        });

        await career.save();
        return res.status(200).json({ type: "success", message: 'Career opportunity added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            type: "error",
            message: 'Server error: Please try again later or contact devrajeshthapa@gmail.com to resolve this issue'
        });
    }
};

const deleteCareer = async (req, res) => {
    const { id } = req.params;

    try {
        const career = await Career.findByIdAndDelete(id);
        if (!career) {
            return res.status(404).json({ type: "error", message: 'Career not found' });
        }
        return res.status(200).json({ type: "success", message: 'Career opportunity deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            type: "error",
            message: 'Server error: Please try again later or contact devrajeshthapa@gmail.com to resolve this issue'
        });
    }
};

const updateCareer = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        deadline,
        qualification,
        requiredSkills,
        tags,
        type,
        workMode,
        jobLevel,
        salary
    } = req.body;

    try {
        const updatedCareer = await Career.findByIdAndUpdate(
            id,
            {
                title,
                description,
                deadline,
                qualification,
                requiredSkills,
                tags,
                type,
                workMode,
                jobLevel,
                salary
            },
            { new: true }
        );

        if (!updatedCareer) {
            return res.status(404).json({ type: "error", message: 'Career not found' });
        }

        return res.status(200).json({ type: "success", message: 'Career opportunity updated successfully', career: updatedCareer });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            type: "error",
            message: 'Server error: Please try again later or contact devrajeshthapa@gmail.com to resolve this issue'
        });
    }
};

export { getCareers, getCareer, addCareer, deleteCareer, updateCareer };