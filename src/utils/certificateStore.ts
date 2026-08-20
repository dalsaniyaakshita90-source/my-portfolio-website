import { CERTIFICATES_LIST, CertificateItem } from '../data/certificatesData';

// Local storage key for user-uploaded custom certificate images
const CUSTOM_CERTS_STORAGE_KEY = 'akshita_portfolio_custom_certificate_images';

export interface CustomCertificateMap {
  [certId: string]: string; // certId -> base64 data URL or custom image URL
}

// In-memory persistent map so uploaded images are NEVER lost during session even if localStorage is full
const inMemoryCertificatesMap: CustomCertificateMap = {};

export function getStoredCustomCertificates(): CustomCertificateMap {
  const result: CustomCertificateMap = { ...inMemoryCertificatesMap };
  try {
    const saved = localStorage.getItem(CUSTOM_CERTS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, ...inMemoryCertificatesMap };
    }
  } catch (e) {
    console.warn('Failed to read custom certificate images from localStorage', e);
  }
  return result;
}

export function saveCustomCertificateImage(certId: string, imageDataUrl: string): void {
  // Always update in-memory map first so current session never loses it
  inMemoryCertificatesMap[certId] = imageDataUrl;

  try {
    const current = getStoredCustomCertificates();
    current[certId] = imageDataUrl;
    localStorage.setItem(CUSTOM_CERTS_STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn('Failed to save custom certificate image to localStorage, keeping in-memory', e);
  }

  // Trigger window event so all components update in real-time
  window.dispatchEvent(new CustomEvent('certificate_images_updated', { detail: { certId, imageDataUrl } }));
}

export function resetCustomCertificateImage(certId: string): void {
  delete inMemoryCertificatesMap[certId];
  try {
    const current = getStoredCustomCertificates();
    delete current[certId];
    localStorage.setItem(CUSTOM_CERTS_STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn('Failed to reset custom certificate image', e);
  }
  window.dispatchEvent(new CustomEvent('certificate_images_updated', { detail: { certId, imageDataUrl: null } }));
}

/**
 * Reads a browsed file from device gallery, compresses it using HTML5 Canvas to fit
 * reliably within localStorage limits without QuotaExceededError, and saves it permanently.
 */
export function compressAndSaveImageFile(certId: string, file: File, callback?: (dataUrl: string) => void): void {
  const reader = new FileReader();
  reader.onload = (e) => {
    const rawDataUrl = e.target?.result as string;
    if (!rawDataUrl) return;

    const img = new Image();
    img.onload = () => {
      const MAX_WIDTH = 1200;
      const MAX_HEIGHT = 1200;
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        if (width > height) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        } else {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        // Compress as clean JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
        saveCustomCertificateImage(certId, compressedDataUrl);
        if (callback) callback(compressedDataUrl);
      } else {
        saveCustomCertificateImage(certId, rawDataUrl);
        if (callback) callback(rawDataUrl);
      }
    };
    img.onerror = () => {
      saveCustomCertificateImage(certId, rawDataUrl);
      if (callback) callback(rawDataUrl);
    };
    img.src = rawDataUrl;
  };
  reader.readAsDataURL(file);
}
