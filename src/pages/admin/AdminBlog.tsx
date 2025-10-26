import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BlogForm } from "@/components/BlogForm";
import { format } from "date-fns";
import { createBlogPost, updateBlogPost } from "@/api/blog";
import { getDoctorApi } from "@/api/doctor";

type BlogPost = {
  _id: string;
  title: string;
  titleAr: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  date: string;
  content: string;
  contentAr: string;
  published: boolean;
};

export default function AdminBlog() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  const handleSubmit = async (data: Omit<BlogPost, '_id' | 'authorName' | 'authorImage'>) => {
    setIsSubmitting(true);
    try {
      if (editingPost?._id) {
        // Update existing post
        const updatedPost = await updateBlogPost(editingPost._id, data);
        setPosts(posts.map(p => 
          p._id === editingPost._id 
            ? { 
                ...p, // Keep existing properties
                ...updatedPost, // Update with new data
                authorName: p.authorName, // Keep existing author name
                authorImage: p.authorImage // Keep existing author image
              }
            : p
        ));
        toast({ title: "Blog post updated successfully", variant: "success" });
      } else {
        // Create new post
        const newPost = await createBlogPost(data);
        // Find the author to get their details
        const author = await getDoctorApi(data.authorId);
        const newBlogPost: BlogPost = {
          ...newPost,
          _id: newPost._id,
          authorName: author ? `${author.name}` : 'Unknown Author',
          authorImage: author?.image?.url || ''
        };
        setPosts([newBlogPost, ...posts]);
        toast({ title: "Blog post created successfully", variant: "success" });
      }
      
      setIsOpen(false);
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    // In a real app, you would make an API call here
    // await deleteBlogPost(id);
    setPosts(posts.filter(p => p._id !== id));
    toast({ title: "Blog post deleted successfully", variant: "success" });
  };

  const togglePublished = (id: string) => {
    // In a real app, you would make an API call here
    // await toggleBlogPostPublishStatus(id);
    setPosts(posts.map(p => 
      p._id === id ? { ...p, published: !p.published } : p
    ));
    toast({ title: "Post status updated", variant: "success" });
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Manage blog posts and articles</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setEditingPost(null);
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <BlogForm 
              initialData={editingPost ? {
                _id: editingPost._id || '',
                title: editingPost.title || '',
                titleAr: editingPost.titleAr || '',
                authorId: editingPost.authorId || '',
                date: editingPost.date || new Date().toISOString(),
                content: editingPost.content || '',
                contentAr: editingPost.contentAr || '',
                published: editingPost.published || false
              } : undefined}
              onSubmit={handleSubmit}
              onCancel={() => setIsOpen(false)}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6">
        <CardHeader className="px-0">
          <CardTitle>All Blog Posts ({posts.length})</CardTitle>
        </CardHeader>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Author Section */}
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {post.authorImage ? (
                        <img 
                          src={post.authorImage} 
                          alt={post.authorName} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-muted-foreground text-lg">
                          {post.authorName ? post.authorName.charAt(0).toUpperCase() : 'U'}
                        </span>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{post.authorName || 'Unknown Author'}</p>
                      <p className="text-xs text-muted-foreground">
                        {post.date ? format(new Date(post.date), 'MMM d, yyyy') : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                    </div>
                    <div className="border-t pt-3 mt-3 border-muted">
                      <h4 className="font-medium text-sm text-right">{post.titleAr}</h4>
                      <p className="text-xs text-muted-foreground text-right line-clamp-2">{post.contentAr}</p>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="mt-4 flex justify-between items-center">
                    <Button 
                      variant={post.published ? "default" : "secondary"} 
                      size="sm"
                      className="text-xs"
                      onClick={() => togglePublished(post._id)}
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
                          handleDelete(post._id);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">No blog posts found. Create your first post!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
