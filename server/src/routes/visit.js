/**
 * @swagger
 * tags:
 *    name: Visit
 *    description: API to manage visits.
 */

import express from 'express';
import multer from 'multer';
import controller from '../controllers/visit';

const visit = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

visit.post('/', controller.create);
visit.delete('/', controller.delete);
visit.put('/', controller.update);

visit.post('/photos/:visitId', upload.single('photo'), controller.uploadPhotos);
visit.get('/photos/:visitId', controller.getPhotos);

visit.get('/comments/:id', controller.getComments);
visit.put('/comments/:id', controller.addComment);

export default visit;
