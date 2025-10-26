import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import OfferForm from "@/components/OfferForm";
import { getOffersApi, deleteOfferApi, updateOfferApi, type OfferResponse } from "@/api/offer";

type Offer = OfferResponse;

export default function AdminOffers() {
  const { toast } = useToast();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDate, setEditDate] = useState<string>("")

  const loadOffers = useCallback(async () => {
    try {
      const list = await getOffersApi();
      setOffers(list);
    } catch (e) {
      toast({ title: "Failed to load offers" });
    }
  }, [toast]);

  useEffect(() => {
    loadOffers();
  }, [loadOffers]);

  const handleDelete = async (id: string) => {
    try {
      await deleteOfferApi(id);
      setOffers(prev => prev.filter(o => o._id !== id));
      toast({ title: "Offer deleted", variant: "default" });
    } catch (e) {
      toast({ title: "Failed to delete offer", variant: "destructive" });
    }
  };

  const startEdit = (offer: Offer) => {
    setEditingId(offer._id);
    const d = new Date(offer.offerEndDate);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    setEditDate(`${yyyy}-${mm}-${dd}`);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDate("");
  };

  const saveEdit = async (id: string) => {
    try {
      const iso = new Date(editDate).toISOString();
      const updated = await updateOfferApi(id, null, iso);
      setOffers(prev => prev.map(o => (o._id === id ? updated : o)));
      toast({ title: "Offer updated", variant: "default" });
      cancelEdit();
    } catch (e) {
      toast({ title: "Failed to update offer", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Offers Management</h1>
          <p className="text-muted-foreground">Manage promotional offers</p>
        </div>
        <OfferForm onCreated={() => { toast({ title: "Offer created", variant: "default" }); loadOffers(); }} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Offers ({offers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offers.map((offer) => (
              <div key={offer._id} className="rounded-lg border p-4 space-y-3">
                <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded bg-muted">
                  {offer.offerPoster?.url ? (
                    <img 
                      src={offer.offerPoster.url} 
                      alt="poster" 
                      className="max-h-full max-w-full object-contain" 
                      style={{ maxHeight: '100%', maxWidth: '100%' }}
                    />
                  ) : (
                    <div className="text-muted-foreground">No image</div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-3">
                  {editingId === offer._id ? (
                    <div className="flex items-end gap-2 flex-1">
                      <div className="flex-1">
                        <label htmlFor={`date-${offer._id}`} className="text-sm text-muted-foreground">Edit valid until</label>
                        <Input id={`date-${offer._id}`} type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
                      </div>
                      <Button variant="default" onClick={() => saveEdit(offer._id)} disabled={!editDate}>Save</Button>
                      <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>
                    </div>
                  ) : (
                    <>
                    <div>
                      <div className="text-sm text-muted-foreground">Valid until</div>
                      <div className="font-medium">{new Date(offer.offerEndDate).toLocaleDateString()}</div>
                    </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => startEdit(offer)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(offer._id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
