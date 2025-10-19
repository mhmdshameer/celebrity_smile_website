import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Offer = {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  active: boolean;
};

export default function AdminOffers() {
  const { toast } = useToast();
  const [offers, setOffers] = useState<Offer[]>([
    { id: "1", title: "Summer Special", description: "50% off teeth whitening", discount: "50%", validUntil: "2025-08-31", active: true },
    { id: "2", title: "New Patient Offer", description: "Free consultation", discount: "100%", validUntil: "2025-12-31", active: true },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", discount: "", validUntil: "", active: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOffer) {
      setOffers(offers.map(o => o.id === editingOffer.id ? { ...formData, id: editingOffer.id } : o));
      toast({ title: "Offer updated successfully" });
    } else {
      setOffers([...offers, { ...formData, id: Date.now().toString() }]);
      toast({ title: "Offer added successfully" });
    }
    setIsOpen(false);
    setFormData({ title: "", description: "", discount: "", validUntil: "", active: true });
    setEditingOffer(null);
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData(offer);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setOffers(offers.filter(o => o.id !== id));
    toast({ title: "Offer deleted successfully" });
  };

  const toggleActive = (id: string) => {
    setOffers(offers.map(o => o.id === id ? { ...o, active: !o.active } : o));
    toast({ title: "Offer status updated" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Offers Management</h1>
          <p className="text-muted-foreground">Manage promotional offers</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingOffer(null); setFormData({ title: "", description: "", discount: "", validUntil: "", active: true }); }}>
              <Plus className="mr-2 h-4 w-4" /> Add Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingOffer ? "Edit Offer" : "Add New Offer"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Offer Title</Label>
                <Input id="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="discount">Discount</Label>
                <Input id="discount" value={formData.discount} onChange={e => setFormData({ ...formData, discount: e.target.value })} placeholder="e.g., 50%" required />
              </div>
              <div>
                <Label htmlFor="validUntil">Valid Until</Label>
                <Input id="validUntil" type="date" value={formData.validUntil} onChange={e => setFormData({ ...formData, validUntil: e.target.value })} required />
              </div>
              <Button type="submit" className="w-full">{editingOffer ? "Update" : "Add"} Offer</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Offers ({offers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.title}</TableCell>
                  <TableCell>{offer.discount}</TableCell>
                  <TableCell>{offer.validUntil}</TableCell>
                  <TableCell>
                    <Button 
                      variant={offer.active ? "default" : "secondary"} 
                      size="sm"
                      onClick={() => toggleActive(offer.id)}
                    >
                      {offer.active ? "Active" : "Inactive"}
                    </Button>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{offer.description}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(offer)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(offer.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
