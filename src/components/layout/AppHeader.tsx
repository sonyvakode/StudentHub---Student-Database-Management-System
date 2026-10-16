import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  CheckCircle2,
  ChevronDown,
  Settings,
  Database,
  PlusCircle,
} from 'lucide-react';
import { useBackendStatus } from '../../context/BackendStatusContext';

interface AppHeaderProps {
  onToggleMobileMenu: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentCount } = useBackendStatus();

  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Compute Breadcrumb based on route
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/') return [{ label: 'StudentHub', to: '/' }, { label: 'Dashboard' }];
    if (path === '/students') return [{ label: 'StudentHub', to: '/' }, { label: 'All Students' }];
    if (path === '/students/new')
      return [{ label: 'Students', to: '/students' }, { label: 'Add Student' }];
    if (path.includes('/edit'))
      return [{ label: 'Students', to: '/students' }, { label: 'Edit Record' }];
    if (path.startsWith('/students/'))
      return [{ label: 'Students', to: '/students' }, { label: 'Student Details' }];
    if (path === '/settings') return [{ label: 'StudentHub', to: '/' }, { label: 'Data & Settings' }];
    return [{ label: 'StudentHub', to: '/' }, { label: 'Overview' }];
  };

  const breadcrumbs = getBreadcrumbs();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/students?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const notifications = [
    {
      id: '1',
      title: 'Database Synced',
      time: 'Live',
      type: 'success',
      text: `${studentCount !== null ? studentCount : '8'} student records active and persisted.`,
    },
    {
      id: '2',
      title: 'EWB Edu Tech Pvt. Ltd.',
      time: 'Internship 2026',
      type: 'info',
      text: 'Students Database CRUD Application.',
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-xs border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-slate-400">/</span>}
                {crumb.to && !isLast ? (
                  <Link
                    to={crumb.to}
                    className="hover:text-indigo-600 transition-colors font-medium"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={`font-semibold ${isLast ? 'text-slate-900' : 'text-slate-600'}`}>
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Middle: Live Student Search Control */}
      <div className="flex-1 max-w-md mx-2">
        <form onSubmit={handleSearchSubmit} className="relative">
          <label htmlFor="headerSearchInput" className="sr-only">
            Search students by name, ID or email
          </label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            id="headerSearchInput"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students (ID, Name, Email)..."
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-indigo-400 rounded-lg text-slate-800 placeholder-slate-400 transition-all focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Quick Add Button */}
        <Link
          to="/students/new"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Add Student</span>
        </Link>

        {/* Database Status Quick Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border bg-emerald-50 text-emerald-700 border-emerald-200">
          <Database className="w-3 h-3 text-emerald-600" />
          <span>Database Active</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen((prev) => !prev)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-lg p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-900">Notifications</span>
                <span className="text-[11px] text-emerald-600 font-medium">All Healthy</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <p className="text-xs font-semibold text-slate-800 flex-1 truncate">{n.title}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 pl-5.5 leading-relaxed">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Administrator Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="User profile options"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs uppercase">
              AD
            </div>
            <div className="hidden xl:block text-left">
              <span className="text-xs font-semibold text-slate-800 block leading-none">
                Admin
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-slate-200 shadow-lg p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-semibold text-slate-900 leading-none">Administrator</p>
                <p className="text-[11px] text-slate-500 mt-1">EWB Edu Tech Pvt. Ltd.</p>
              </div>

              <Link
                to="/students"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <span>All Students</span>
              </Link>
              <Link
                to="/settings"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Data & Backup Settings</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
