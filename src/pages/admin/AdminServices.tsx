"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import ServiceForm, { type ServiceFormValues } from "@/components/ServiceForm";
import {
  addServiceApi,
  deleteServiceApi,
  getServicesApi,
  updateServiceApi,
  type ServiceResponse,
} from "@/api/service";

// -----------------------------
// Component
// -----------------------------

export default function AdminServices() {
  const { toast } = useToast();

  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceResponse | null>(null);

  // 🟢 Fetch all services
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const list = await getServicesApi();
        setServices(list);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        toast({
          title: "Failed to load services",
          description: message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [toast]);

  // -----------------------------
  // Handlers
  // -----------------------------

  const openAdd = () => {
    setEditingService(null);
    setIsOpen(true);
  };

  const handleSubmitForm = async (values: ServiceFormValues) => {
    try {
      if (editingService) {
        // ✅ Update existing service
        const resp = await updateServiceApi(editingService._id, {
          service: values.service,
          serviceAr: values.serviceAr,
          description: values.description,
          descriptionAr: values.descriptionAr,
          file: values.file || null,
        });

        setServices((prev) => prev.map((s) => (s._id === editingService._id ? resp : s)));
        toast({ title: "Service updated successfully", variant: "success" });
      } else {
        // ✅ Add new service
        if (!values.file) {
          toast({
            title: "Image required",
            description: "Please select an image for the service.",
            variant: "destructive",
          });
          return;
        }

        const resp = await addServiceApi({
          service: values.service,
          serviceAr: values.serviceAr,
          description: values.description,
          descriptionAr: values.descriptionAr,
          file: values.file,
        });

        setServices((prev) => [...prev, resp]);
        toast({ title: "Service added successfully", variant: "success" });
      }

      setIsOpen(false);
      setEditingService(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast({
        title: "Failed to save service",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (service: ServiceResponse) => {
    setEditingService(service);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteServiceApi(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
      toast({ title: "Service deleted successfully", variant: "success" });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast({
        title: "Failed to delete service",
        description: message,
        variant: "destructive",
      });
    }
  };

  // -----------------------------
  // Render
  // -----------------------------

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Services Management</h1>
          <p className="text-muted-foreground">Manage your clinic services</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>

        {/* Form Modal */}
        <ServiceForm
          open={isOpen}
          onOpenChange={setIsOpen}
          title={editingService ? "Edit Service" : "Add New Service"}
          initialValues={
            editingService
              ? {
                  service: editingService.service,
                  serviceAr: editingService.serviceAr,
                  description: editingService.description,
                  descriptionAr: editingService.descriptionAr,
                  serviceImage: editingService.serviceImage,
                  file: null,
                }
              : undefined
          }
          onSubmit={handleSubmitForm}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Services ({services.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Service (EN)</TableHead>
                <TableHead>Service (AR)</TableHead>
                <TableHead>Description (EN)</TableHead>
                <TableHead>Description (AR)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              )}

              {!loading && services.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No services found.
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                services.map((service) => (
                  <TableRow key={service._id}>
                    <TableCell>
                      <img
                        src={service.serviceImage?.url}
                        alt={service.service}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{service.service}</TableCell>
                    <TableCell>{service.serviceAr}</TableCell>
                    <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                    <TableCell className="max-w-xs truncate">{service.descriptionAr}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(service._id)}>
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
