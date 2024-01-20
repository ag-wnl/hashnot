import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Function to get the Firebase Authentication token
export const getAuthHeader = async () => {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken()
          .then((token) => resolve(token))
          .catch((error) => reject(error));
      } else {
        reject(new Error('User not authenticated'));
      }
    });
  });
};