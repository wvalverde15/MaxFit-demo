import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc, addDoc } from 'firebase/firestore/lite';
import { environment } from '../../environments/environment';

const firebaseApp = initializeApp(environment.firebase);
const firestore = getFirestore(firebaseApp);

@Injectable({ providedIn: 'root' })
export class FirebaseDataService {
  async list<T>(path: string): Promise<T[]> {
    const snapshot = await getDocs(collection(firestore, path));
    return snapshot.docs.map(item => ({ id: item.id, ...item.data() } as T));
  }

  async create<T extends Record<string, unknown>>(path: string, data: T): Promise<string> {
    const reference = await addDoc(collection(firestore, path), data);
    return reference.id;
  }

  async save<T extends Record<string, unknown>>(path: string, id: string, data: T): Promise<void> {
    await setDoc(doc(firestore, path, id), data, { merge: true });
  }

  async remove(path: string, id: string): Promise<void> {
    await deleteDoc(doc(firestore, path, id));
  }
}
