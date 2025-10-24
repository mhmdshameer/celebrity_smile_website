import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AddDoctor from "@/components/AddDoctor";
import { getDoctorsApi, getDoctorApi, deleteDoctorApi, type DoctorResponse } from "@/api/doctor";

type Doctor = {
  id: string;
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
};

export default function AdminDoctors() {
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const handleAddDoctor = (doctor: Doctor) => {
    setDoctors([...doctors, doctor]);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoctorApi(id);
      setDoctors(doctors.filter(d => d.id !== id));
      toast({ title: "Doctor deleted successfully", variant: "success" });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast({ title: "Failed to delete doctor", description: message, variant: "destructive" });
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const d = await getDoctorApi(id);
      const mapped: Doctor = {
        id: d._id,
        name: d.name,
        nameAr: d.nameAr,
        specialties: d.specialties ?? [],
        specialtiesAr: d.specialtiesAr ?? [],
        image: d.image,
        slug: d.slug,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      };
      setEditingDoctor(mapped);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast({ title: "Failed to load doctor", description: message, variant: "destructive" });
    }
  };

  const handleUpdateDoctor = (doctor: Doctor) => {
    setDoctors(doctors.map(d => d.id === doctor.id ? doctor : d));
    setEditingDoctor(null);
  };

  const handleClose = () => {
    setEditingDoctor(null);
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const list: DoctorResponse[] = await getDoctorsApi();
        if (!isMounted) return;
        const mapped: Doctor[] = list.map((d) => ({
          id: d._id,
          name: d.name,
          nameAr: d.nameAr,
          specialties: d.specialties ?? [],
          specialtiesAr: d.specialtiesAr ?? [],
          image: d.image,
          slug: d.slug,
          createdAt: d.createdAt,
          updatedAt: d.updatedAt,
        }));
        setDoctors(mapped);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        toast({ title: "Failed to load doctors", description: message, variant: "destructive" });
      }
    })();
    return () => { isMounted = false; };
  }, [toast]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Doctors Management</h1>
          <p className="text-muted-foreground">Manage your medical team</p>
        </div>
        <AddDoctor
          onAddDoctor={handleAddDoctor}
          editingDoctor={editingDoctor}
          onUpdateDoctor={handleUpdateDoctor}
          onClose={handleClose}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Doctors ({doctors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Specialties</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>
                    {doctor.image.url ? (
                      <img
                        src={doctor.image.url}
                        alt={doctor.name}
                        className="h-10 w-10 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-muted border" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <p>{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{doctor.nameAr}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {doctor.specialties.map((specialty, index) => (
                        <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(doctor.id)}>
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
