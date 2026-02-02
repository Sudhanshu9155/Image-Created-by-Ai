import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/clerk-react";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { isLoaded, isSignedIn } = useAuth();

  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <nav className="sticky top-0 z-100 flex h-14 shadow-sm items-center justify-between px-10">
      <div>
        <h1 className="text-4xl font-semibold tracking-tighter">Imagine</h1>
      </div>
      <div className="flex gap-4">
        <Button variant="outline">
          <NavLink to="/">Home</NavLink>
        </Button>
        <Button variant="outline">
          <NavLink to="/about">About</NavLink>
        </Button>
      </div>

      {!isLoaded && <div>Loading...</div>}

      {isLoaded && isSignedIn && (
        <UserButton
          userProfileMode="navigation"
          userProfileUrl="/auth/profile"
          showName
        >
          <UserButton.MenuItems>
            <UserButton.Action
              label={theme === "light" ? "Dark Mode" : "Light Mode"}
              labelIcon={
                theme === "light" ? (
                  <Moon className="size-4" />
                ) : (
                  <Sun className="size-4" />
                )
              }
              onClick={toggleTheme}
            />
          </UserButton.MenuItems>
        </UserButton>
      )}

      {isLoaded && !isSignedIn && (
        <div className="flex gap-4">
          <Button variant="secondary">
            <NavLink to="/auth/login">Login</NavLink>
          </Button>
          <Button variant="secondary">
            <NavLink to="/auth/register">Register</NavLink>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;