export interface NewDoctorPayload {
  name: string;
  nameAr: string;
  specialties: string[];
  specialtiesAr?: string[];
  file?: File; // image file to upload as 'image'
  image?: {
    url: string;
    public_id: string;
  };
}

export interface DoctorResponse {
  _id: string;
  name: string;
  nameAr: string;
  specialties: string[];
  specialtiesAr?: string[];
  image: {
    url: string;
    public_id: string;
  }; 
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Add doctor
export async function addDoctorApi(payload: NewDoctorPayload): Promise<DoctorResponse> {
    console.log("Payload:", payload)
  const form = new FormData();
  form.append("name", payload.name);
  form.append("nameAr", payload.nameAr);
  form.append("specialties", payload.specialties.join(","));
  if (payload.specialtiesAr && payload.specialtiesAr.length) {
    form.append("specialtiesAr", payload.specialtiesAr.join(","));
  }
  form.append("image", payload.file);

  const res = await fetch(`${API_BASE}/doctor`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to add doctor: ${res.status} ${text}`);
  }
  return res.json();
}

// Get doctors
export async function getDoctorsApi(): Promise<DoctorResponse[]> {
  const res = await fetch(`${API_BASE}/doctor`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get doctors: ${res.status} ${text}`);
  }
  return res.json();
}

// Get a single doctor by id
export async function getDoctorApi(id: string): Promise<DoctorResponse> {
  const res = await fetch(`${API_BASE}/doctor/${id}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get doctor: ${res.status} ${text}`);
  }
  return res.json();
}

 

// Update doctor
export async function updateDoctorApi(id: string, payload: NewDoctorPayload): Promise<DoctorResponse> {
  const form = new FormData();
  
  // Log the payload for debugging
  console.log('updateDoctorApi payload:', {
    id,
    payload: {
      ...payload,
      file: payload.file ? 'File present' : 'No file',
      image: payload.image ? 'Image data present' : 'No image data'
    }
  });

  // Append all fields to form data
  form.append("name", payload.name);
  form.append("nameAr", payload.nameAr);
  
  // Handle specialties
  if (Array.isArray(payload.specialties)) {
    form.append("specialties", payload.specialties.join(","));
  } else {
    form.append("specialties", String(payload.specialties || ''));
  }
  
  if (payload.specialtiesAr && payload.specialtiesAr.length) {
    form.append("specialtiesAr", Array.isArray(payload.specialtiesAr) 
      ? payload.specialtiesAr.join(",") 
      : String(payload.specialtiesAr));
  }
  
  // Handle image data
  if (payload.file) {
    console.log('Appending new image file to form data');
    form.append("image", payload.file);
  } else if (payload.image) {
    console.log('Appending existing image data to form:', {
      url: payload.image.url,
      public_id: payload.image.public_id
    });
    form.append("imageUrl", payload.image.url);
    form.append("imagePublicId", payload.image.public_id);
  } else {
    console.warn('No image data provided in updateDoctorApi');
  }

  // Log form data for debugging
  for (const [key, value] of form.entries()) {
    console.log(`Form data - ${key}:`, value);
  }

  try {
    const res = await fetch(`${API_BASE}/doctor/${id}`, {
      method: "PUT",
      body: form,
      // Don't set Content-Type header - let the browser set it with the correct boundary
    });

    const responseData = await res.json().catch(() => ({}));
    
    if (!res.ok) {
      console.error('Update failed:', {
        status: res.status,
        statusText: res.statusText,
        response: responseData
      });
      const errorText = responseData.message || res.statusText || 'Unknown error';
      throw new Error(`Failed to update doctor: ${res.status} ${errorText}`);
    }
    
    return responseData;
  } catch (error) {
    console.error('Error in updateDoctorApi:', error);
    throw error;
  }
}

// Delete doctor
export async function deleteDoctorApi(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/doctor/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete doctor: ${res.status} ${text}`);
  }
}
