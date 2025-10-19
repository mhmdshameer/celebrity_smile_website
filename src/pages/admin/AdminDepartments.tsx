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

type Department = {
  id: string;
  name: string;
  description: string;
  head: string;
  staff: string;
};

export default function AdminDepartments() {
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([
    { id: "1", name: "Orthodontics", description: "Teeth alignment and braces", head: "Dr. Sarah Johnson", staff: "5" },
    { id: "2", name: "Cosmetic Dentistry", description: "Aesthetic dental procedures", head: "Dr. Michael Chen", staff: "4" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", head: "", staff: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDept) {
      setDepartments(departments.map(d => d.id === editingDept.id ? { ...formData, id: editingDept.id } : d));
      toast({ title: "Department updated successfully" });
    } else {
      setDepartments([...departments, { ...formData, id: Date.now().toString() }]);
      toast({ title: "Department added successfully" });
    }
    setIsOpen(false);
    setFormData({ name: "", description: "", head: "", staff: "" });
    setEditingDept(null);
  };

  const handleEdit = (dept: Department) => {
    setEditingDept(dept);
    setFormData(dept);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setDepartments(departments.filter(d => d.id !== id));
    toast({ title: "Department deleted successfully" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Departments Management</h1>
          <p className="text-muted-foreground">Manage clinic departments</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingDept(null); setFormData({ name: "", description: "", head: "", staff: "" }); }}>
              <Plus className="mr-2 h-4 w-4" /> Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingDept ? "Edit Department" : "Add New Department"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Department Name</Label>
                <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="head">Department Head</Label>
                <Input id="head" value={formData.head} onChange={e => setFormData({ ...formData, head: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="staff">Staff Count</Label>
                <Input id="staff" type="number" value={formData.staff} onChange={e => setFormData({ ...formData, staff: e.target.value })} required />
              </div>
              <Button type="submit" className="w-full">{editingDept ? "Update" : "Add"} Department</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Departments ({departments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department Name</TableHead>
                <TableHead>Head</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>{dept.head}</TableCell>
                  <TableCell>{dept.staff}</TableCell>
                  <TableCell className="max-w-xs truncate">{dept.description}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(dept)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(dept.id)}>
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
