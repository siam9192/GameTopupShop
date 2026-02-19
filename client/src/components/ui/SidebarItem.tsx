'use client';
import { RouteItem } from '@/types/utils.type';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

// ---------------------- Sidebar Item ----------------------
interface SidebarItemProps {
  route: RouteItem;
  isOpen: boolean;
  toggleMenu: (label: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ route, isOpen, toggleMenu }) => {
  const pathname = usePathname()
  const router = useRouter();
  const hasChildren = !!route.children?.length;
  
  return (
    <div key={route.label}>
      <ListItem
        className={`p-2 ${pathname === route.path ?"text-secondary":"text-white" } hover:text-secondary hover:scale-105 duration-75 hover:cursor-pointer`}
        onClick={() => {
          if (route.path) router.push(route.path);
        }}
      >
        {route.icon && (
          <ListItemIcon>
            <route.icon size={22} color="white" />
          </ListItemIcon>
        )}
        <ListItemText disableTypography className="font-primary font-medium text-base ">
          {route.label}
        </ListItemText>

        {hasChildren && (
          <IconButton
            onClick={e => {
              e.stopPropagation();
              toggleMenu(route.label);
            }}
            color="primary"
          >
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </ListItem>

      {/* Render Children */}
      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {route.children?.map(child => (
              <ListItem
                key={child.label}
                className="hover:text-secondary hover:cursor-pointer"
                onClick={() => router.push(child.path!)}
              >
                <ListItemText
                  disableTypography
                  className={`text-sm ${pathname === child.path ?"text-secondary":"text-gray-300"} hover:text-secondary`}
                >
                  {child.label}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </div>
  );
};

export default SidebarItem;
