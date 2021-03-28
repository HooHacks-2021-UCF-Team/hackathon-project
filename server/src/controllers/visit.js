/* eslint-disable no-underscore-dangle */
import { db, bucket } from '../services/firebase';
import logger from '../util';

const Visit = {
  create: async (req, res) => {
    const { patientId } = req.body;

    let addedVisitId = await db.collection('visits').add({ patientId });
    [, addedVisitId] = addedVisitId._path.segments;

    let addedVisit = await db.collection('visits').doc(addedVisitId).get();
    addedVisit = addedVisit.data();
    addedVisit.id = addedVisitId;

    return res.status(201).send(addedVisit);
  },

  delete: async (req, res) => {
    const { id } = req.body;

    const visitToDelete = await db.collection('visits').doc(id).get();
    if (!visitToDelete) return res.status(404).send({ message: `Visit with id ${id} could not be found.` });

    visitToDelete.delete().then(() => res.send());
  },

  update: async (req, res) => {
    const { id, fieldsToUpdate } = req.body;

    const visitToUpdate = await db.collection('visits').doc(id);
    if (!visitToUpdate) return res.status(404).send({ message: `Visit with id ${id} could not be found.` });

    await visitToUpdate.update({ fieldsToUpdate });

    const result = await db.collection('visits').doc(id).get().data();

    return res.status(201).send(result);
  },

  uploadPhotos: async (req, res) => {
    const { photo } = await req.file.buffer;
    logger.info(req);
    // if (!photos) return res.send({ message: 'Nothing to upload' });
    // if (!visitId) return res.send({ message: 'No visit id given' });

    const options = {
      destination: 'image.png',
    };

    bucket.upload(photo, options, (err, file) => {
      logger.info(`Updloaded image ${file.name}`);
    });
  },
};

export default Visit;
