import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BlogForm, type BlogFormValues } from "@/components/BlogForm";
import { format, parseISO } from "date-fns";
import {
  BlogPost,
  Author,
  getAllBlogs,
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
} from "@/api/blog";
import { useNavigate } from "react-router-dom";

// Type guard to check if author is an Author object
function isAuthor(author: unknown): author is Author {
  return (
    author !== null &&
    typeof author === "object" &&
    "_id" in author &&
    typeof (author as { _id: unknown })._id === "string"
  );
}

// Helper function to get author information
const getAuthorInfo = (authorId: string | Author) => {
  if (!authorId) {
    return {
      name: "Unknown Author",
      nameAr: "مؤلف غير معروف",
      initial: "U",
      image: undefined,
    };
  }

  if (isAuthor(authorId)) {
    return {
      name: authorId.name || "Unknown Author",
      nameAr: authorId.nameAr || "مؤلف غير معروف",
      initial: authorId.name?.charAt(0).toUpperCase() || "U",
      image: authorId.image?.url,
    };
  }

  // If it's just an ID string
  return {
    name: "Loading...",
    nameAr: "...",
    initial: "L",
    image: undefined,
  };
};

// Use the BlogFormValues type from the component
type BlogFormSubmitData = BlogFormValues & {
  date: string; // This will be converted to string in the form submission
};

export default function AdminBlog() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState<{
    _id?: string;
    title?: string;
    titleAr?: string;
    authorId?: string; // Always use string ID for the form
    content?: string;
    contentAr?: string;
    date?: string;
    published?: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs();
      setPosts(data);
    } catch (error) {
      console.error("Error loading blog posts:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load blog posts";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: BlogFormSubmitData) => {
    setIsSubmitting(true);
    try {
      // Prepare the post data with the correct types
      const postData = {
        title: formData.title,
        titleAr: formData.titleAr,
        content: formData.content,
        contentAr: formData.contentAr,
        date: formData.date,
        authorId: formData.authorId,
        published: formData.published ?? false,
        ...(formData._id && { _id: formData._id }),
      };

      if (editingPost?._id) {
        // Update existing post
        await updateBlogPost(editingPost._id, postData);
        toast({ title: "Blog post updated successfully", variant: "success" });
      } else {
        // Create new post
        await createBlogPost(postData);
        toast({ title: "Blog post created successfully", variant: "success" });
      }

      // Reload posts to get fresh data from the server
      await loadPosts();
      setIsOpen(false);
      setEditingPost(null);
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    // Extract author ID safely
    let authorId: string = "";
    if (post.authorId) {
      authorId =
        typeof post.authorId === "object"
          ? post.authorId._id
          : String(post.authorId);
    }

    setEditingPost({
      ...post,
      authorId,
      // Ensure date is in the correct format for the form
      date: post.date
        ? format(parseISO(post.date), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBlogPost(id);
      setPosts(posts.filter((p) => p._id !== id));
      toast({ title: "Blog post deleted successfully", variant: "success" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const togglePublished = async (id: string) => {
    try {
      const post = posts.find((p) => p._id === id);
      if (!post) return;

      const updatedPost = await updateBlogPost(id, {
        published: !post.published,
      });

      setPosts(posts.map((p) => (p._id === id ? { ...p, ...updatedPost } : p)));
      toast({ title: "Post status updated", variant: "success" });
    } catch (error) {
      console.error("Error toggling post status:", error);
      toast({
        title: "Error",
        description: "Failed to update post status. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogs();
        setPosts(data);
      } catch (error: unknown) {
        console.error("Error loading blog posts:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load blog posts";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [toast, setLoading]);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">
            Manage blog posts and articles
          </p>
        </div>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setEditingPost(null);
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <BlogForm
              initialData={
                editingPost
                  ? {
                      _id: editingPost._id,
                      title: editingPost.title || "",
                      titleAr: editingPost.titleAr || "",
                      content: editingPost.content || "",
                      contentAr: editingPost.contentAr || "",
                      authorId:
                        typeof editingPost.authorId === "object" &&
                        editingPost.authorId !== null
                          ? (editingPost.authorId as { _id: string })._id
                          : editingPost.authorId || "",
                      date: editingPost.date,
                      published: editingPost.published || false,
                    }
                  : undefined
              }
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsOpen(false);
                setEditingPost(null);
              }}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6">
        <CardHeader className="px-0">
          <CardTitle>All Blog Posts ({posts.length})</CardTitle>
        </CardHeader>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const { name, nameAr, initial, image } = getAuthorInfo(
                post.authorId
              );
              const postDate =
                post.date && post.date !== "Invalid Date"
                  ? format(new Date(post.date), "MMM d, yyyy")
                  : "N/A";

              return (
                <Card
                  key={post._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    {/* Author Section */}
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {image ? (
                          <img
                            src={image}
                            alt={name}
                            className="h-full w-full object-cover"
                            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                              const target = e.currentTarget;
                              target.style.display = "none";
                              const fallback = document.createElement("div");
                              fallback.className =
                                "h-full w-full flex items-center justify-center bg-muted";
                              fallback.textContent = initial;
                              const parent = target.parentNode;
                              if (parent) {
                                parent.insertBefore(fallback, target.nextSibling);
                              }
                            }}
                          />
                        ) : (
                          <span className="text-muted-foreground text-lg">
                            {initial}
                          </span>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">
                          {postDate}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.content}
                        </p>
                      </div>
                      <div className="border-t pt-3 mt-3 border-muted">
                        <h4 className="font-medium text-sm text-right">
                          {post.titleAr}
                        </h4>
                        <p className="text-xs text-muted-foreground text-right line-clamp-2">
                          {post.contentAr}
                        </p>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="mt-4 flex justify-between items-center">
                      <Button
                        variant={post.published ? "default" : "secondary"}
                        size="sm"
                        className="text-xs"
                        onClick={() => post._id && togglePublished(post._id)}
                      >
                        {post.published ? "Published" : "Draft"}
                      </Button>
                      <div className="space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(post);
                          }}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (post._id) {
                              handleDelete(post._id);
                            }
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">
                No blog posts found. Create your first post!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
