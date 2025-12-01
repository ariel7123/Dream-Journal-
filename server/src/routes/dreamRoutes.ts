import { Router } from 'express';
import {
  getDreams,
  getDream,
  createDream,
  updateDream,
  deleteDream,
  toggleFavorite,
} from '../controllers/dreamController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// All routes are protected
router.use(protect);

// CRUD routes
router.route('/')
  .get(getDreams)      // GET /api/dreams
  .post(createDream);  // POST /api/dreams

router.route('/:id')
  .get(getDream)       // GET /api/dreams/:id
  .put(updateDream)    // PUT /api/dreams/:id
  .delete(deleteDream); // DELETE /api/dreams/:id

// Special routes
router.patch('/:id/favorite', toggleFavorite); // PATCH /api/dreams/:id/favorite

export default router;