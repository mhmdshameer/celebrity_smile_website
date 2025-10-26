import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getDoctorsApi, type DoctorResponse} from "@/api/doctor"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  titleAr: z.string().min(2, {
    message: "Arabic title is required.",
  }),
  authorId: z.string({
    required_error: "Please select an author.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  contentAr: z.string().min(10, {
    message: "Arabic content is required.",
  }),
  published: z.boolean().default(false),
});

type BlogFormValues = z.infer<typeof formSchema>;

interface BlogFormProps {
  initialData?: {
    _id?: string;
    title: string;
    titleAr: string;
    authorId: string;
    date: string;
    content: string;
    contentAr: string;
    published: boolean;
  } | null;
  onSubmit: (data: Omit<BlogFormValues, 'date'> & { date: string }) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function BlogForm({ initialData, onSubmit, onCancel, isSubmitting }: BlogFormProps) {
  const [doctors, setDoctors] = useState<DoctorResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      date: new Date(initialData.date)
    } : {
      title: "",
      titleAr: "",
      authorId: "",
      date: new Date(),
      content: "",
      contentAr: "",
      published: false,
    },
  });

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await getDoctorsApi();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to load doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const handleSubmit = (data: BlogFormValues) => {
    onSubmit({
      ...data,
      date: data.date.toISOString()
    });
  };

  if (loading) {
    return <div>Loading form...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title (English)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter blog title in English" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Arabic Title */}
          <FormField
            control={form.control}
            name="titleAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>العنوان (بالعربية)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="أدخل عنوان المدونة بالعربية" 
                    dir="rtl"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author Dropdown */}
          <FormField
            control={form.control}
            name="authorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an author" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor._id} value={doctor._id}>
                        {doctor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Picker */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Publish Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* English Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (English)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your blog post in English"
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Arabic Content */}
        <FormField
          control={form.control}
          name="contentAr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>المحتوى (بالعربية)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="اكتب محتوى المدونة بالعربية"
                  className="min-h-[200px]"
                  dir="rtl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {initialData ? "Updating..." : "Creating..."}
              </>
            ) : initialData ? (
              "Update Post"
            ) : (
              "Create Post"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
