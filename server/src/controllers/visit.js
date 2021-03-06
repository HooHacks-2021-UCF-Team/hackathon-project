/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { v4 as uuidv4 } from 'uuid';
import { db, bucket, ref } from '../services/firebase';
import logger from '../util';

const Visit = {
  // works
  create: async (req, res) => {
    const { patientId, date } = req.body;

    let addedVisitId = await db.collection('visits').add({ patientId, date });
    [, addedVisitId] = addedVisitId._path.segments;

    let addedVisit = await db.collection('visits').doc(addedVisitId).get();
    addedVisit = addedVisit.data();
    addedVisit.id = addedVisitId;

    return res.status(201).send(addedVisit);
  },

  delete: async (req, res) => {
    const { id } = req.body;

    const visitToDelete = await db.collection('visits').doc(id);
    if (!visitToDelete.exists) return res.status(404).send({ message: `Visit with id ${id} could not be found.` });

    visitToDelete.delete().then(() => res.send());
  },

  update: async (req, res) => {
    const { id, fieldsToUpdate } = req.body;

    const visitToUpdate = db.collection('visits').doc(id);

    await visitToUpdate.update({ fieldsToUpdate });

    let result = await db.collection('visits').doc(id).get();

    result = result.data();

    return res.status(201).send(result);
  },
  // works
  uploadPhotos: async (req, res) => {
    const photo = req.file.buffer;
    const { visitId } = req.params;

    const rand = uuidv4();

    const config = {
      action: 'read',
      expires: '03-17-2025',
    };

    const file = bucket.file(`visits/${visitId}/${rand}.png`);

    await file.save(photo);

    const url = await file.getSignedUrl(config);

    return res.send(url);
  },
  // works
  getPhotos: async (req, res) => {
    const { visitId } = req.params;

    const config = {
      action: 'read',
      expires: '03-17-2025',
    };

    let files = await bucket.getFiles({ prefix: `visits/${visitId}/` });
    [files] = files;

    const urls = [];

    for (let i = 0; i < files.length; i++) {
      const x = await files[i].getSignedUrl(config);
      urls.push(x[0]);
    }

    res.send(urls);
  },
  // works
  addComment: async (req, res) => {
    const { id } = req.params;
    const commentToAdd = req.body.comment;
    const commenterEmail = req.body.email;

    const docRef = await db.collection('visits').doc(id);

    const querySnapshot = await docRef.get();
    let data = [];
    data = querySnapshot.data().comments || [];
    let comments = [];
    comments = [{ comment: commentToAdd, email: commenterEmail }, ...data];

    await docRef.update({ comments });
    res.send();
  },
  // works
  getComments: async (req, res) => {
    const { id } = req.params;

    const docRef = await db.collection('visits').doc(id);

    const querySnapshot = await docRef.get();
    const comments = querySnapshot.data().comments || [];

    res.send({ comments });
  },
};

export default Visit;
