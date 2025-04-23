import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, username: string, password: string) => void;
}

export function LoginModal({ open, onClose, onLogin, onRegister }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginEmail, loginPassword);
    onClose();
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      // In a real app, you'd show an error message
      console.error("Passwords don't match");
      return;
    }
    onRegister(registerEmail, registerUsername, registerPassword);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AgroClima Account</DialogTitle>
          <DialogDescription>
            Access advanced features and save your preferences.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a 
                    href="#" 
                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      // In a real app, this would open a password recovery flow
                      console.log('Password recovery clicked');
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="pt-4 space-y-2">
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-slate-800 px-2 text-slate-500 dark:text-slate-400">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" type="button">
                    <span className="material-icons text-sm mr-2">google</span>
                    Google
                  </Button>
                  <Button variant="outline" type="button">
                    <span className="material-icons text-sm mr-2">facebook</span>
                    Facebook
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  type="email" 
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-username">Username</Label>
                <Input 
                  id="register-username" 
                  type="text" 
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  required
                  placeholder="Choose a username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password" 
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <Input 
                  id="register-confirm-password" 
                  type="password" 
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-start">
          <div className="text-xs text-center w-full text-muted-foreground">
            By continuing, you agree to our 
            <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline"> Terms of Service</a> and 
            <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline"> Privacy Policy</a>.
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
