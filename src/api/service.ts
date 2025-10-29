// -----------------------------
// Types
// -----------------------------

export interface ServiceResponse {
  _id: string;
  service: string;
  serviceAr: string;
  description: string;
  descriptionAr: string;
  serviceImage: {
    url: string;
    public_id: string;
  };
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

// When creating a service, image file is required
export interface NewServicePayload {
  service: string;
  serviceAr: string;
  description: string;
  descriptionAr: string;
  file: File; // actual image file (required)
}

// When updating, image file is optional
export interface UpdateServicePayload {
  service?: string;
  serviceAr?: string;
  description?: string;
  descriptionAr?: string;
  file?: File | null; // optional new image file
}

// -----------------------------
// API Base URL
// -----------------------------

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// -----------------------------
// API Functions
// -----------------------------

// 🟢 CREATE Service (multipart/form-data)
export async function addServiceApi(payload: NewServicePayload): Promise<ServiceResponse> {
  const form = new FormData();
  form.append("service", payload.service);
  form.append("serviceAr", payload.serviceAr);
  form.append("description", payload.description);
  form.append("descriptionAr", payload.descriptionAr);
  form.append("image", payload.file); // backend expects 'image' key

  const res = await fetch(`${API_BASE}/service`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to add service: ${res.status} ${text}`);
  }

  return res.json();
}

// 🟡 READ - All Services
export async function getServicesApi(): Promise<ServiceResponse[]> {
  const res = await fetch(`${API_BASE}/service`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get services: ${res.status} ${text}`);
  }
  return res.json();
}

// 🟡 READ - Single Service
export async function getServiceApi(id: string): Promise<ServiceResponse> {
  const res = await fetch(`${API_BASE}/service/${id}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get service: ${res.status} ${text}`);
  }
  return res.json();
}

// 🟠 UPDATE Service (multipart if image, JSON otherwise)
export async function updateServiceApi(id: string, payload: UpdateServicePayload): Promise<ServiceResponse> {
  // If a new image file is provided, send multipart/form-data
  if (payload.file) {
    const form = new FormData();
    if (payload.service) form.append("service", payload.service);
    if (payload.serviceAr) form.append("serviceAr", payload.serviceAr);
    if (payload.description) form.append("description", payload.description);
    if (payload.descriptionAr) form.append("descriptionAr", payload.descriptionAr);
    form.append("image", payload.file);

    const res = await fetch(`${API_BASE}/service/${id}`, {
      method: "PUT",
      body: form,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update service: ${res.status} ${text}`);
    }

    return res.json();
  }

  // Otherwise send JSON (no image change)
  const res = await fetch(`${API_BASE}/service/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service: payload.service,
      serviceAr: payload.serviceAr,
      description: payload.description,
      descriptionAr: payload.descriptionAr,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update service: ${res.status} ${text}`);
  }

  return res.json();
}

// 🔴 DELETE Service
export async function deleteServiceApi(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/service/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete service: ${res.status} ${text}`);
  }
}
