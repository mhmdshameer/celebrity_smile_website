import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addDoctorApi } from "@/api/doctor";
import { getDoctorApi, updateDoctorApi } from "@/api/doctor";
// Optional shadcn components for combobox. If not present in your setup, we can replace with a custom list.
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

type DoctorFormData = {
  name: string;
  nameAr: string;
  specialties: string[]; // English
  specialtiesAr?: string[]; // Arabic (optional for backward compatibility)
  image: {
    url: string;
    public_id: string;
  };
};

type AddDoctorProps = {
  onAddDoctor: (doctor: DoctorFormData & { id: string }) => void;
  editingDoctor?: (DoctorFormData & { id: string }) | null;
  onUpdateDoctor?: (doctor: DoctorFormData & { id: string }) => void;
  onClose?: () => void;
};

export default function AddDoctor({ onAddDoctor, editingDoctor, onUpdateDoctor, onClose }: AddDoctorProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<DoctorFormData>({
    name: "",
    nameAr: "",
    specialties: [],
    specialtiesAr: [],
    image: {
      url: "",
      public_id: ""
    }
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const imagePreviewRef = useRef<string | null>(null);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [specialtyQuery, setSpecialtyQuery] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Clean up previous preview URL
      if (imagePreviewRef.current) {
        URL.revokeObjectURL(imagePreviewRef.current);
      }

      // Create new preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      imagePreviewRef.current = previewUrl;
    } else {
      // If no file selected, clean up preview
      if (imagePreviewRef.current) {
        URL.revokeObjectURL(imagePreviewRef.current);
        imagePreviewRef.current = null;
      }
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  const clearImage = () => {
    // Clean up preview URL
    if (imagePreviewRef.current) {
      URL.revokeObjectURL(imagePreviewRef.current);
      imagePreviewRef.current = null;
    }
    setSelectedFile(null);
    setImagePreview(null);
  };

  const uploadImage = async (file: File): Promise<{ url: string; public_id: string }> => {
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return {
        url: data.url,
        public_id: data.public_id
      };
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // If adding new doctor, post to backend with multipart form
      if (!editingDoctor) {
        if (!selectedFile) {
          toast({ title: "Image required", description: "Please select an image.", variant: "destructive" });
          return;
        }
        setIsUploading(true);
        const resp = await addDoctorApi({
          name: formData.name,
          nameAr: formData.nameAr,
          specialties: formData.specialties.filter(s => s.trim() !== ""),
          specialtiesAr: (formData.specialtiesAr ?? []).filter(s => s.trim() !== ""),
          file: selectedFile,
        });

        const created = {
          id: resp._id,
          name: resp.name,
          nameAr: resp.nameAr,
          specialties: resp.specialties,
          specialtiesAr: resp.specialtiesAr ?? [],
          image: resp.image,
        };
        onAddDoctor(created);
        toast({ title: "Doctor added successfully", variant: "success" });
      } else if (editingDoctor && onUpdateDoctor) {
        if (!editingDoctor) return;
        
        let imageData = formData.image;
        if (selectedFile) {
          setIsUploading(true);
          imageData = await uploadImage(selectedFile);
        }
        
        // Use the updateDoctorApi function
        await updateDoctorApi(editingDoctor.id, {
          name: formData.name,
          nameAr: formData.nameAr,
          specialties: formData.specialties.filter(s => s.trim() !== ""),
          specialtiesAr: (formData.specialtiesAr ?? []).filter(s => s.trim() !== ""),
          file: selectedFile || new File([], '') // Pass the selected file or an empty file if none selected
        });
        
        // The API call will throw an error if it fails
        const fresh = await getDoctorApi(editingDoctor.id);
        const updated = {
          id: fresh._id,
          name: fresh.name,
          nameAr: fresh.nameAr,
          specialties: fresh.specialties ?? [],
          specialtiesAr: fresh.specialtiesAr ?? [],
          image: fresh.image,
        };
        onUpdateDoctor(updated);
        toast({ title: "Doctor updated successfully", variant: "success" });
      }

      // Reset form
      setFormData({
        name: "",
        nameAr: "",
        specialties: [],
        specialtiesAr: [],
        image: {
          url: "",
          public_id: ""
        }
      });
      setSelectedFile(null);

      // Clean up preview URL
      if (imagePreviewRef.current) {
        URL.revokeObjectURL(imagePreviewRef.current);
        imagePreviewRef.current = null;
      }
      setImagePreview(null);

      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save doctor. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSpecialtiesEnChange = (value: string) => {
    const specialties = value.split(',').map(s => s.trim()).filter(s => s !== '');
    setFormData(prev => ({ ...prev, specialties }));
  };

  const handleSpecialtiesArChange = (value: string) => {
    const specialtiesAr = value.split(',').map(s => s.trim()).filter(s => s !== '');
    setFormData(prev => ({ ...prev, specialtiesAr }));
  };

  // Paired specialties for dropdown selection
  const DENTAL_SPECIALTIES: { en: string; ar: string }[] = [
    { en: "ORTHODONTICS", ar: "تقويم الأسنان" },
    { en: "DENTOFACIAL ORTHOPEDICS", ar: "تقويم الفكين والوجه" },
    { en: "GENERAL DENTIST", ar: "طبيب أسنان عام" },
    { en: "PROSTHODONTIC SPECIALIST (CROWN)", ar: "أخصائي تركيبات (تيجان)" },
    { en: "ENDODONTIC SPECIALIST (RCT)", ar: "أخصائي علاج جذور الأسنان (حشو العصب)" },
    { en: "MAXILLOFACIAL SURGEON (IMPLANT)", ar: "جراح وجه وفكين (زراعة الأسنان)" },
    { en: "PEDODONTIST (CHILDREN)", ar: "أخصائي أسنان الأطفال" },
  ];

  const addSpecialtyPair = (pair: { en: string; ar: string }) => {
    setFormData(prev => {
      const existsEn = prev.specialties.includes(pair.en);
      const existsAr = prev.specialtiesAr.includes(pair.ar);
      return {
        ...prev,
        specialties: existsEn ? prev.specialties : [...prev.specialties, pair.en],
        specialtiesAr: existsAr ? prev.specialtiesAr : [...prev.specialtiesAr, pair.ar],
      };
    });
  };

  const removeSpecialtyByEn = (en: string) => {
    setFormData(prev => {
      const idx = prev.specialties.indexOf(en);
      if (idx === -1) return prev;
      const nextEn = prev.specialties.filter((_, i) => i !== idx);
      const nextAr = (prev.specialtiesAr ?? []).filter((_, i) => i !== idx);
      return { ...prev, specialties: nextEn, specialtiesAr: nextAr };
    });
  };

  // If editing, populate form with existing data
  useEffect(() => {
    if (editingDoctor) {
      setFormData({
        name: editingDoctor.name || "",
        nameAr: editingDoctor.nameAr || "",
        specialties: editingDoctor.specialties || [],
        specialtiesAr: editingDoctor.specialtiesAr ?? [],
        image: editingDoctor.image || { url: "", public_id: "" }
      });

      // For editing, show the existing image (from Cloudinary)
      // Don't set selectedFile since we're not uploading a new file yet
      setImagePreview(editingDoctor.image?.url || null);
      imagePreviewRef.current = editingDoctor.image?.url || null;
    }
  }, [editingDoctor]);

  // Open dialog automatically when an editing doctor is provided
  useEffect(() => {
    if (editingDoctor) {
      setIsOpen(true);
    }
  }, [editingDoctor]);

  // Reset editing state when dialog transitions from open -> closed
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      setFormData({
        name: "",
        nameAr: "",
        specialties: [],
        specialtiesAr: [],
        image: {
          url: "",
          public_id: ""
        }
      });
      setSelectedFile(null);

      // Clean up preview URL when dialog closes
      if (imagePreviewRef.current) {
        URL.revokeObjectURL(imagePreviewRef.current);
        imagePreviewRef.current = null;
      }
      setImagePreview(null);

      onClose?.();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, onClose]);

  // Cleanup preview URL on component unmount
  useEffect(() => {
    return () => {
      if (imagePreviewRef.current) {
        URL.revokeObjectURL(imagePreviewRef.current);
      }
    };
  }, []); // Empty dependency array means this runs only on unmount

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!editingDoctor && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Doctor
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingDoctor ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name (English)</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="nameAr">Name (Arabic)</Label>
              <Input
                id="nameAr"
                value={formData.nameAr}
                onChange={e => setFormData({ ...formData, nameAr: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Specialties selector with search (paired EN/AR) */}
          <div className="space-y-2">
            <Label>Select Specialties</Label>
            <Popover open={specialtyOpen} onOpenChange={setSpecialtyOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" type="button" className="w-full justify-between">
                  Add specialties...
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[360px]" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search specialties..."
                    value={specialtyQuery}
                    onValueChange={setSpecialtyQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No specialties found.</CommandEmpty>
                    <CommandGroup>
                      {DENTAL_SPECIALTIES
                        .filter(s =>
                          s.en.toLowerCase().includes(specialtyQuery.toLowerCase()) ||
                          s.ar.includes(specialtyQuery)
                        )
                        .map((s) => (
                          <CommandItem
                            key={s.en}
                            value={s.en}
                            onSelect={() => {
                              addSpecialtyPair(s);
                            }}
                          >
                            <span className="flex-1">{s.en} — {s.ar}</span>
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Selected chips */}
            {formData.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((en, idx) => (
                  <span
                    key={en}
                    className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm"
                  >
                    {en} — {formData.specialtiesAr?.[idx] ?? ''}
                    <button
                      type="button"
                      className="ml-1 text-muted-foreground hover:text-destructive"
                      onClick={() => removeSpecialtyByEn(en)}
                      aria-label={`Remove ${en}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="image">Doctor Image</Label>
            <div className="mt-1 flex items-center space-x-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="flex-1"
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    {selectedFile ? "New Image Preview:" : "Current Image:"}
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearImage}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>
                <div className="mt-2 relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {selectedFile && (
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">NEW</span>
                    </div>
                  )}
                </div>
                {selectedFile && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : (editingDoctor ? "Edit" : "Add")} Doctor
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
