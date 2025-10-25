import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export type ServiceFormValues = {
  service: string;
  serviceAr: string;
  description: string;
  descriptionAr: string;
  servicePrice: number | "";
  file?: File | null;
};

export function ServiceForm({
  open,
  onOpenChange,
  title,
  initialValues,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  initialValues?: ServiceFormValues;
  onSubmit: (values: ServiceFormValues) => void;
}) {
  const [values, setValues] = useState<ServiceFormValues>({
    service: "",
    serviceAr: "",
    description: "",
    descriptionAr: "",
    servicePrice: "",
    file: null,
  });

  useEffect(() => {
    if (initialValues) setValues(initialValues);
    else
      setValues({
        service: "",
        serviceAr: "",
        description: "",
        descriptionAr: "",
        servicePrice: "",
        file: null,
      });
  }, [initialValues, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum =
      typeof values.servicePrice === "string"
        ? Number(values.servicePrice)
        : values.servicePrice;
    onSubmit({ ...values, servicePrice: priceNum });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="service">Service Name (EN)</Label>
              <Input
                id="service"
                value={values.service}
                onChange={(e) =>
                  setValues((v) => ({ ...v, service: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="serviceAr">Service Name (AR)</Label>
              <Input
                id="serviceAr"
                value={values.serviceAr}
                onChange={(e) =>
                  setValues((v) => ({ ...v, serviceAr: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="description">Description (EN)</Label>
              <Textarea
                id="description"
                value={values.description}
                onChange={(e) =>
                  setValues((v) => ({ ...v, description: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="descriptionAr">Description (AR)</Label>
              <Textarea
                id="descriptionAr"
                value={values.descriptionAr}
                onChange={(e) =>
                  setValues((v) => ({ ...v, descriptionAr: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="servicePrice">Service Price</Label>
            <Input
              id="servicePrice"
              type="number"
              step="0.01"
              value={values.servicePrice}
              onChange={(e) => {
                const val = e.target.value;
                setValues((v) => ({
                  ...v,
                  servicePrice: val === "" ? "" : Number(val),
                }));
              }}
              required
            />
          </div>
          {/* 
          <div>
            <Label htmlFor="image">Image (optional, required by backend for create)</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                setValues((v) => ({ ...v, file: f }));
              }}
            />
          </div> */}

          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ServiceForm;
