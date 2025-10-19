import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Building2, Tag, DollarSign, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { title: "Doctors", count: "12", icon: Users, link: "/admin/doctors", color: "text-blue-600" },
  { title: "Services", count: "8", icon: Briefcase, link: "/admin/services", color: "text-green-600" },
  { title: "Departments", count: "6", icon: Building2, link: "/admin/departments", color: "text-purple-600" },
  { title: "Offers", count: "4", icon: Tag, link: "/admin/offers", color: "text-orange-600" },
  { title: "Price Items", count: "24", icon: DollarSign, link: "/admin/price-list", color: "text-pink-600" },
  { title: "Blog Posts", count: "15", icon: FileText, link: "/admin/blog", color: "text-indigo-600" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Celebrity Smile Admin Panel</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.title} to={stat.link}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count}</div>
                <p className="text-xs text-muted-foreground">Click to manage</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common management tasks</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Link to="/admin/doctors" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <h3 className="font-semibold mb-1">Add New Doctor</h3>
            <p className="text-sm text-muted-foreground">Create a new doctor profile</p>
          </Link>
          <Link to="/admin/blog" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <h3 className="font-semibold mb-1">Write Blog Post</h3>
            <p className="text-sm text-muted-foreground">Publish a new article</p>
          </Link>
          <Link to="/admin/offers" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <h3 className="font-semibold mb-1">Create Offer</h3>
            <p className="text-sm text-muted-foreground">Add a promotional offer</p>
          </Link>
          <Link to="/admin/services" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <h3 className="font-semibold mb-1">Add Service</h3>
            <p className="text-sm text-muted-foreground">Register a new service</p>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
