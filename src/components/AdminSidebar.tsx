import { NavLink, useLocation } from "react-router-dom";
import { 
  Users, 
  Briefcase, 
  Building2, 
  Tag, 
  DollarSign, 
  FileText,
  LayoutDashboard,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const adminItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, end: true },
  { title: "Doctors", url: "/admin/doctors", icon: Users, end: false },
  { title: "Services", url: "/admin/services", icon: Briefcase, end: false },
  // { title: "Departments", url: "/admin/departments", icon: Building2, end: false },
  { title: "Offers", url: "/admin/offers", icon: Tag, end: false },
  // { title: "Price List", url: "/admin/price-list", icon: DollarSign, end: false },
  { title: "Blog", url: "/admin/blog", icon: FileText, end: false },
];

export function AdminSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <h2 className={`font-bold text-lg ${!open && "hidden"}`}>
          Admin Panel
        </h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => {
                const isActive = item.end 
                  ? location.pathname === item.url 
                  : location.pathname.startsWith(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={isActive ? "bg-primary/10 text-primary font-semibold" : ""}
                    >
                      <NavLink to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className="text-destructive hover:bg-destructive/10">
                    <LogOut className="h-4 w-4" />
                    <span>Exit Admin</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
