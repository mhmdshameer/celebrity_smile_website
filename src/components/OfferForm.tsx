import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createOfferApi, updateOfferApi, type OfferResponse } from "@/api/offer";

type Props = {
  mode?: "create" | "edit";
  offer?: OfferResponse;
  onCreated?: (offer: OfferResponse) => void;
  onUpdated?: (offer: OfferResponse) => void;
  trigger?: ReactNode;
};

export default function OfferForm({ mode = "create", offer, onCreated, onUpdated, trigger }: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [validUntil, setValidUntil] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Update preview when file changes
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  // Prefill when editing
  useEffect(() => {
    if (mode === "edit" && offer) {
      try {
        const d = new Date(offer.offerEndDate);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        setValidUntil(`${yyyy}-${mm}-${dd}`);
      } catch {
        // ignore
      }
    } else {
      setValidUntil("");
    }
  }, [mode, offer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !validUntil) {
      toast({ title: "Please select a file and valid until date" });
      return;
    }
    try {
      setSubmitting(true);
      const iso = new Date(validUntil).toISOString();
      if (mode === "edit" && offer) {
        const updated = await updateOfferApi(offer._id, file, iso);
        toast({ title: "Offer updated", variant: "default" });
        onUpdated?.(updated);
      } else {
        if (!file) return; // safeguard; already checked above
        const created = await createOfferApi(file, iso);
        toast({ title: "Offer created", variant: "default" });
        onCreated?.(created);
      }
      setOpen(false);
      setFile(null);
      setValidUntil("");
    } catch (err) {
      toast({ title: mode === "edit" ? "Failed to update offer" : "Failed to create offer" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          <span onClick={() => setOpen(true)}>{trigger}</span>
        ) : (
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Offer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Offer" : "Add New Offer"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="image">Offer Image</Label>
            <div className="flex items-center gap-2">
              <Input id="image" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} {...(mode === "create" ? { required: true } : {})} />
              {file && (
                <Button type="button" variant="secondary" onClick={() => setFile(null)}>
                  Cancel file
                </Button>
              )}
            </div>
          </div>
          {previewUrl && (
            <div className="rounded-md border p-2">
              <img src={previewUrl} alt="Preview" className="max-h-60 w-full object-contain" />
            </div>
          )}
          <div>
            <Label htmlFor="validUntil">Valid Until</Label>
            <Input id="validUntil" type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Saving..." : mode === "edit" ? "Update Offer" : "Add Offer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
