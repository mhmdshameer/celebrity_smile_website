export interface NewDoctorPayload {
  name: string;
  nameAr: string;
  specialties: string[];
  specialtiesAr?: string[];
  file: File; // image file to upload as 'image'
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
  form.append("name", payload.name);
  form.append("nameAr", payload.nameAr);
  form.append("specialties", payload.specialties.join(","));
  if (payload.specialtiesAr && payload.specialtiesAr.length) {
    form.append("specialtiesAr", payload.specialtiesAr.join(","));
  }
  form.append("image", payload.file);

  const res = await fetch(`${API_BASE}/doctor/${id}`, {
    method: "PUT",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update doctor: ${res.status} ${text}`);
  }
  return res.json();
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
