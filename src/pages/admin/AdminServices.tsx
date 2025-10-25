import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ServiceForm, { type ServiceFormValues } from "@/components/ServiceForm";
import { addServiceApi, deleteServiceApi, getServicesApi, updateServiceApi, type ServiceResponse } from "@/api/service";

type Service = {
  id: string;
  service: string;
  serviceAr: string;
  description: string;
  descriptionAr: string;
  servicePrice: number;
  slug?: string;
};

export default function AdminServices() {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const list = await getServicesApi();
        const mapped: Service[] = list.map((s: ServiceResponse) => ({
          id: s._id,
          service: s.service,
          serviceAr: s.serviceAr,
          description: s.description,
          descriptionAr: s.descriptionAr,
          servicePrice: s.servicePrice,
          slug: s.slug,
        }));
        setServices(mapped);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        toast({ title: "Failed to load services", description: message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [toast]);

  const openAdd = () => {
    setEditingService(null);
    setIsOpen(true);
  };

  const handleSubmitForm = async (values: ServiceFormValues) => {
    try {
      if (editingService) {
        const resp = await updateServiceApi(editingService.id, {
          service: values.service,
          serviceAr: values.serviceAr,
          description: values.description,
          descriptionAr: values.descriptionAr,
          servicePrice: Number(values.servicePrice || 0),
        });
        const updated: Service = {
          id: resp._id,
          service: resp.service,
          serviceAr: resp.serviceAr,
          description: resp.description,
          descriptionAr: resp.descriptionAr,
          servicePrice: resp.servicePrice,
          slug: resp.slug,
        };
        setServices(services.map(s => (s.id === editingService.id ? updated : s)));
        toast({ title: "Service updated successfully", variant: "success" });
      } else {
        // Backend add requires image file per controller; enforce it
        // if (!values.file) {
        //   toast({ title: "Image required", description: "Please select an image for the service.", variant: "destructive" });
        //   return;
        // }
        const resp = await addServiceApi({
          service: values.service,
          serviceAr: values.serviceAr,
          description: values.description,
          descriptionAr: values.descriptionAr,
          servicePrice: Number(values.servicePrice || 0),
          // file: values.file,
        });
        const created: Service = {
          id: resp._id,
          service: resp.service,
          serviceAr: resp.serviceAr,
          description: resp.description,
          descriptionAr: resp.descriptionAr,
          servicePrice: resp.servicePrice,
          slug: resp.slug,
        };
        setServices([...services, created]);
        toast({ title: "Service added successfully", variant: "success" });
      }
      setIsOpen(false);
      setEditingService(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast({ title: "Failed to save service", description: message, variant: "destructive" });
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteServiceApi(id);
      setServices(services.filter(s => s.id !== id));
      toast({ title: "Service deleted successfully", variant: "success" });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast({ title: "Failed to delete service", description: message, variant: "destructive" });
    }
  };

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
        <ServiceForm
          open={isOpen}
          onOpenChange={setIsOpen}
          title={editingService ? "Edit Service" : "Add New Service"}
          initialValues={editingService ? {
            service: editingService.service,
            serviceAr: editingService.serviceAr,
            description: editingService.description,
            descriptionAr: editingService.descriptionAr,
            servicePrice: editingService.servicePrice,
          } : undefined}
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
                <TableHead>Service (EN)</TableHead>
                <TableHead>Service (AR)</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Description (EN)</TableHead>
                <TableHead>Description (AR)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">Loading...</TableCell>
                </TableRow>
              )}
              {!loading && services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.service}</TableCell>
                  <TableCell>{service.serviceAr}</TableCell>
                  <TableCell>{service.servicePrice.toFixed(2)}</TableCell>
                  <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                  <TableCell className="max-w-xs truncate">{service.descriptionAr}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
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
