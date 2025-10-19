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

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  image: string;
};

export default function AdminDoctors() {
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: "1", name: "Dr. Sarah Johnson", specialty: "Orthodontist", qualification: "DDS, MS", experience: "15 years", image: "" },
    { id: "2", name: "Dr. Michael Chen", specialty: "Prosthodontist", qualification: "DDS, PhD", experience: "12 years", image: "" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({ name: "", specialty: "", qualification: "", experience: "", image: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      setDoctors(doctors.map(d => d.id === editingDoctor.id ? { ...formData, id: editingDoctor.id } : d));
      toast({ title: "Doctor updated successfully" });
    } else {
      setDoctors([...doctors, { ...formData, id: Date.now().toString() }]);
      toast({ title: "Doctor added successfully" });
    }
    setIsOpen(false);
    setFormData({ name: "", specialty: "", qualification: "", experience: "", image: "" });
    setEditingDoctor(null);
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData(doctor);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setDoctors(doctors.filter(d => d.id !== id));
    toast({ title: "Doctor deleted successfully" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Doctors Management</h1>
          <p className="text-muted-foreground">Manage your medical team</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingDoctor(null); setFormData({ name: "", specialty: "", qualification: "", experience: "", image: "" }); }}>
              <Plus className="mr-2 h-4 w-4" /> Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingDoctor ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="specialty">Specialty</Label>
                <Input id="specialty" value={formData.specialty} onChange={e => setFormData({ ...formData, specialty: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="qualification">Qualification</Label>
                <Input id="qualification" value={formData.qualification} onChange={e => setFormData({ ...formData, qualification: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input id="experience" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
              </div>
              <Button type="submit" className="w-full">{editingDoctor ? "Update" : "Add"} Doctor</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Doctors ({doctors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">{doctor.name}</TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  <TableCell>{doctor.qualification}</TableCell>
                  <TableCell>{doctor.experience}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(doctor)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(doctor.id)}>
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
