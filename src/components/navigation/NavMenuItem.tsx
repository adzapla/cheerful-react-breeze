import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

interface NavMenuItemProps {
  title: string;
  image: string;
  children: React.ReactNode;
}

const NavMenuItem = ({ title, image, children }: NavMenuItemProps) => {
  const isGiftUniverse = title === "L'univers Cadeaux";
  
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-red text-[16px] lg:text-[21px] bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-screen max-w-screen-2xl mx-auto grid gap-0 p-4 md:grid-cols-[1fr_300px] bg-white">
          <div className="grid gap-2">
            {React.Children.map(children, child => {
              if (isGiftUniverse) {
                return React.cloneElement(child as React.ReactElement, {
                  children: React.Children.map(
                    (child as React.ReactElement).props.children,
                    (subChild: React.ReactElement) => {
                      if (subChild?.props?.items) {
                        const updatedItems = subChild.props.items.map((item: any) => ({
                          ...item,
                          href: item.href.replace('/category/univers-cadeaux', '/univers-cadeaux')
                        }));
                        return React.cloneElement(subChild, { items: updatedItems });
                      }
                      return subChild;
                    }
                  )
                });
              }
              return child;
            })}
          </div>
          <div className="flex items-center justify-center h-full">
            <img
              src={image}
              alt={`${title} Collection`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavMenuItem;