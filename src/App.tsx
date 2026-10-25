/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RegistrationForm } from './components/RegistrationForm';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { CaptainsPortal } from './components/CaptainsPortal';
import { RegistrationData } from './types';
import { getStoredRegistrations } from './utils/storage';

export default function App() {
  const [currentRegistration, setCurrentRegistration] = useState<RegistrationData | null>(null);
  const [isCaptainsPortalOpen, setIsCaptainsPortalOpen] = useState(false);
  const [activeCaptain, setActiveCaptain] = useState<string>('');
  const [allRegistrations, setAllRegistrations] = useState<RegistrationData[]>([]);

  // Load registered members from storage
  const refreshRegistrations = () => {
    const list = getStoredRegistrations();
    setAllRegistrations(list);
  };

  useEffect(() => {
    refreshRegistrations();
  }, []);

  const handleRegistrationSuccess = (newMember: RegistrationData) => {
    setCurrentRegistration(newMember);
    refreshRegistrations();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCurrentRegistration(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#0047AB] selection:text-white">
      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {/* Subtle Athletic Background Grid (Inspired by Swiss Sports Flyers) */}
        <div className="absolute inset-0 bg-grid-sports pointer-events-none opacity-60" />

        <div className="relative z-10">
          {currentRegistration ? (
            <ConfirmationScreen
              data={currentRegistration}
              onReset={handleReset}
            />
          ) : (
            <RegistrationForm
              onSubmitSuccess={handleRegistrationSuccess}
              onOpenCaptainsPortal={(captainName) => {
                if (captainName) setActiveCaptain(captainName);
                setIsCaptainsPortalOpen(true);
              }}
            />
          )}
        </div>
      </main>

      {/* Captains / Organizers Management Drawer */}
      <CaptainsPortal
        isOpen={isCaptainsPortalOpen}
        onClose={() => setIsCaptainsPortalOpen(false)}
        registrations={allRegistrations}
        onRefresh={refreshRegistrations}
        activeCaptain={activeCaptain}
      />
    </div>
  );
}
