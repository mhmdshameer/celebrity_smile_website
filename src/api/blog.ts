const API_URL = 'http://localhost:5000/blog';

export interface Author {
  _id: string;
  name: string;
  nameAr: string;
  image: {
    url: string;
    public_id: string;
  };
}

export interface BlogPost {
  _id?: string;
  title: string;
  titleAr: string;
  authorId: string | Author;  // Can be either string ID or Author object
  date: string;
  content: string;
  contentAr: string;
  published: boolean;
  __v?: number;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Create a new blog post
export const createBlogPost = async (postData: Omit<BlogPost, '_id' | 'authorName'>) => {
  try {
    // Ensure authorId is a string when sending to the server
    const payload = {
      ...postData,
      authorId: typeof postData.authorId === 'object' ? postData.authorId._id : postData.authorId
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

// Get all blog posts
export const getAllBlogs = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch(API_URL);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

// Get a single blog post by ID
export const getBlogPost = async (id: string): Promise<BlogPost> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching blog post ${id}:`, error);
    throw error;
  }
};

// Update a blog post
export const updateBlogPost = async (id: string, postData: Partial<BlogPost>): Promise<BlogPost> => {
  try {
    // Ensure authorId is a string when sending to the server
    const payload = {
      ...postData,
      ...(postData.authorId && {
        authorId: typeof postData.authorId === 'object' ? postData.authorId._id : postData.authorId
      })
    };

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error updating blog post ${id}:`, error);
    throw error;
  }
};

// Delete a blog post
export const deleteBlogPost = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    await handleResponse(response);
  } catch (error) {
    console.error(`Error deleting blog post ${id}:`, error);
    throw error;
  }
};

// Toggle blog post published status
export const togglePublishStatus = async (id: string, published: boolean): Promise<BlogPost> => {
  try {
    const response = await fetch(`${API_URL}/${id}/publish`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ published }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error toggling publish status for blog post ${id}:`, error);
    throw error;
  }
};