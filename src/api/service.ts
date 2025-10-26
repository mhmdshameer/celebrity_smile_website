export interface ServiceResponse {
  _id: string;
  service: string;
  serviceAr: string;
  description: string;
  descriptionAr: string;
  servicePrice: number;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewServicePayload {
  service: string;
  serviceAr: string;
  description: string;
  descriptionAr: string;
  servicePrice: number;
  file?: File; // optional image file if backend expects it as 'image'
}

export interface UpdateServicePayload {
  service?: string;
  serviceAr?: string;
  description?: string;
  descriptionAr?: string;
  servicePrice?: number;
}

const API_BASE = "http://localhost:5000";

// Create service (multipart if file provided)
export async function addServiceApi(payload: NewServicePayload): Promise<ServiceResponse> {
  // If an image file is provided, send multipart/form-data; otherwise, send JSON
  if (payload.file) {
    const form = new FormData();
    form.append("service", payload.service);
    form.append("serviceAr", payload.serviceAr);
    form.append("description", payload.description);
    form.append("descriptionAr", payload.descriptionAr);
    form.append("servicePrice", String(payload.servicePrice));
    form.append("image", payload.file);

    const res = await fetch(`${API_BASE}/service`, { method: "POST", body: form });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to add service: ${res.status} ${text}`);
    }
    return res.json();
  }

  const res = await fetch(`${API_BASE}/service`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service: payload.service,
      serviceAr: payload.serviceAr,
      description: payload.description,
      descriptionAr: payload.descriptionAr,
      servicePrice: payload.servicePrice,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to add service: ${res.status} ${text}`);
  }
  return res.json();
}

// Read - list services
export async function getServicesApi(): Promise<ServiceResponse[]> {
  const res = await fetch(`${API_BASE}/service`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get services: ${res.status} ${text}`);
  }
  return res.json();
}

// Read - single service
export async function getServiceApi(id: string): Promise<ServiceResponse> {
  const res = await fetch(`${API_BASE}/service/${id}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get service: ${res.status} ${text}`);
  }
  return res.json();
}

// Update service (JSON body)
export async function updateServiceApi(id: string, payload: UpdateServicePayload): Promise<ServiceResponse> {
  const res = await fetch(`${API_BASE}/service/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update service: ${res.status} ${text}`);
  }
  return res.json();
}

// Delete service
export async function deleteServiceApi(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/service/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete service: ${res.status} ${text}`);
  }
}