import { Response } from 'express';
import Dream from '../models/Draem.js';
import { AuthRequest } from '..//types/index.js';

// @desc    Get all dreams for logged in user
// @route   GET /api/dreams
// @access  Private
export const getDreams = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const dreams = await Dream.find({ user: req.user?.id })
      .sort({ date: -1 }); // Newest first

    res.status(200).json({
      success: true,
      count: dreams.length,
      data: dreams,
    });
  } catch (error) {
    console.error('GetDreams error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching dreams',
    });
  }
};

// @desc    Get single dream
// @route   GET /api/dreams/:id
// @access  Private
export const getDream = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const dream = await Dream.findOne({
      _id: req.params.id,
      user: req.user?.id,
    });

    if (!dream) {
      res.status(404).json({
        success: false,
        error: 'Dream not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: dream,
    });
  } catch (error) {
    console.error('GetDream error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching dream',
    });
  }
};

// @desc    Create new dream
// @route   POST /api/dreams
// @access  Private
export const createDream = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content, date, mood, tags, isLucid } = req.body;

    // Validation
    if (!title || !content) {
      res.status(400).json({
        success: false,
        error: 'Please provide title and content',
      });
      return;
    }

    const dream = await Dream.create({
      user: req.user?.id,
      title,
      content,
      date: date || new Date(),
      mood: mood || 'neutral',
      tags: tags || [],
      isLucid: isLucid || false,
    });

    res.status(201).json({
      success: true,
      message: 'Dream created successfully',
      data: dream,
    });
  } catch (error: any) {
    console.error('CreateDream error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({
        success: false,
        error: messages.join(', '),
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: 'Server error while creating dream',
    });
  }
};

// @desc    Update dream
// @route   PUT /api/dreams/:id
// @access  Private
export const updateDream = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let dream = await Dream.findOne({
      _id: req.params.id,
      user: req.user?.id,
    });

    if (!dream) {
      res.status(404).json({
        success: false,
        error: 'Dream not found',
      });
      return;
    }

    // Only allow updating specific fields
    const allowedUpdates = ['title', 'content', 'date', 'mood', 'tags', 'isLucid', 'isFavorite'];
    const updates: any = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    dream = await Dream.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Dream updated successfully',
      data: dream,
    });
  } catch (error: any) {
    console.error('UpdateDream error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({
        success: false,
        error: messages.join(', '),
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: 'Server error while updating dream',
    });
  }
};

// @desc    Delete dream
// @route   DELETE /api/dreams/:id
// @access  Private
export const deleteDream = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const dream = await Dream.findOne({
      _id: req.params.id,
      user: req.user?.id,
    });

    if (!dream) {
      res.status(404).json({
        success: false,
        error: 'Dream not found',
      });
      return;
    }

    await Dream.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Dream deleted successfully',
      data: {},
    });
  } catch (error) {
    console.error('DeleteDream error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting dream',
    });
  }
};

// @desc    Toggle favorite status
// @route   PATCH /api/dreams/:id/favorite
// @access  Private
export const toggleFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const dream = await Dream.findOne({
      _id: req.params.id,
      user: req.user?.id,
    });

    if (!dream) {
      res.status(404).json({
        success: false,
        error: 'Dream not found',
      });
      return;
    }

    dream.isFavorite = !dream.isFavorite;
    await dream.save();

    res.status(200).json({
      success: true,
      message: dream.isFavorite ? 'Added to favorites' : 'Removed from favorites',
      data: dream,
    });
  } catch (error) {
    console.error('ToggleFavorite error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};