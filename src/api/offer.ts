export interface OfferPoster {
  url: string;
  public_id: string;
}

export interface OfferResponse {
  _id: string;
  offerPoster: OfferPoster | null;
  offerEndDate: string; // ISO string
}

const API_BASE = "http://localhost:5000";

// Get Offers
export const getOffersApi = async (): Promise<OfferResponse[]> => {
  const res = await fetch(`${API_BASE}/offer`);
  if (!res.ok) throw new Error(`Failed to fetch offers (${res.status})`);
  return res.json();
};

// Create Offer (multipart/form-data)
export const createOfferApi = async (
  image: File,
  offerEndDate: string
): Promise<OfferResponse> => {
  const form = new FormData();
  form.append("image", image);
  form.append("offerEndDate", offerEndDate);

  const res = await fetch(`${API_BASE}/offer`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(`Failed to create offer (${res.status})`);
  return res.json();
};

// Update Offer (multipart/form-data)
export const updateOfferApi = async (
  id: string,
  image: File | null,
  offerEndDate?: string
): Promise<OfferResponse> => {
  const form = new FormData();
  if (image) form.append("image", image);
  if (typeof offerEndDate !== "undefined") form.append("offerEndDate", offerEndDate);

  const res = await fetch(`${API_BASE}/offer/${id}`, {
    method: "PUT",
    body: form,
  });
  if (!res.ok) throw new Error(`Failed to update offer (${res.status})`);
  return res.json();
};

// Delete Offer
export const deleteOfferApi = async (id: string): Promise<OfferResponse> => {
  const res = await fetch(`${API_BASE}/offer/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete offer (${res.status})`);
  return res.json();
};

