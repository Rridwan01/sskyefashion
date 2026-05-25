"use client";

import Link from "next/link";
import { Package, LayoutDashboard, Tag, HelpCircle, LogOut, Calendar, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans transition-colors duration-500">
      
      {/* Desktop Admin Sidebar */}
      <aside className="w-64 border-r border-foreground/10 bg-muted flex flex-col hidden md:flex transition-colors duration-500">
        <div className="h-20 flex items-center px-8 border-b border-foreground/10">
          <h2 className="font-serif text-2xl tracking-[0.2em] uppercase text-foreground">SKYE</h2>
        </div>
        
        <nav className="flex-1 py-8 px-4 flex flex-col space-y-2">
          <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Overview</span>
          </Link>
          <Link href="/admin/products" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <Package className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Products</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <Tag className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Categories</span>
          </Link>
          <Link href="/admin/requests" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Concierge</span>
          </Link>
          <Link href="/admin/appointments" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Appointments</span>
          </Link>
          <Link href="/admin/inquiries" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Inquiries</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-foreground/10">
          <button 
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar (Drawer) */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 border-r border-foreground/10 bg-muted flex flex-col transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center justify-between px-8 border-b border-foreground/10">
          <h2 className="font-serif text-2xl tracking-[0.2em] uppercase text-foreground">SKYE</h2>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-foreground/5 rounded-md text-foreground/70 hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 py-8 px-4 flex flex-col space-y-2" onClick={() => setIsMobileMenuOpen(false)}>
          <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Overview</span>
          </Link>
          <Link href="/admin/products" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <Package className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Products</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <Tag className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Categories</span>
          </Link>
          <Link href="/admin/requests" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Concierge</span>
          </Link>
          <Link href="/admin/appointments" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Appointments</span>
          </Link>
          <Link href="/admin/inquiries" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Inquiries</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-foreground/10">
          <button 
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-md hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-20 border-b border-foreground/10 bg-background flex items-center justify-between px-8 shrink-0 transition-colors duration-500">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden mr-4 p-2 hover:bg-foreground/5 rounded-md text-foreground/70 hover:text-foreground"
              aria-label="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-medium uppercase tracking-widest text-foreground/50">Admin Interface</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-xs text-foreground">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {children}
        </div>
      </main>

    </div>
  );
}
