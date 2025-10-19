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

type PriceItem = {
  id: string;
  service: string;
  category: string;
  price: string;
  duration: string;
  description: string;
};

export default function AdminPriceList() {
  const { toast } = useToast();
  const [items, setItems] = useState<PriceItem[]>([
    { id: "1", service: "Teeth Whitening", category: "Cosmetic", price: "$299", duration: "60 min", description: "Professional whitening" },
    { id: "2", service: "Dental Implant", category: "Restorative", price: "$1,999", duration: "120 min", description: "Single tooth implant" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PriceItem | null>(null);
  const [formData, setFormData] = useState({ service: "", category: "", price: "", duration: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? { ...formData, id: editingItem.id } : i));
      toast({ title: "Price item updated successfully" });
    } else {
      setItems([...items, { ...formData, id: Date.now().toString() }]);
      toast({ title: "Price item added successfully" });
    }
    setIsOpen(false);
    setFormData({ service: "", category: "", price: "", duration: "", description: "" });
    setEditingItem(null);
  };

  const handleEdit = (item: PriceItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(i => i.id !== id));
    toast({ title: "Price item deleted successfully" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Price List Management</h1>
          <p className="text-muted-foreground">Manage service pricing</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingItem(null); setFormData({ service: "", category: "", price: "", duration: "", description: "" }); }}>
              <Plus className="mr-2 h-4 w-4" /> Add Price Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Price Item" : "Add New Price Item"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="service">Service Name</Label>
                <Input id="service" value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="e.g., $299" required />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g., 60 min" required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <Button type="submit" className="w-full">{editingItem ? "Update" : "Add"} Price Item</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Price Items ({items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.service}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="font-semibold">{item.price}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
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
