const PROFILE_STORAGE_KEY = 'profiles';

export function getAllProfiles() {
  return JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY)) || [];
}

export function saveProfile(profile) {
  const profiles = getAllProfiles();
  profiles.push(profile);
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles));
}

export function updateProfile(updatedProfile) {
  const profiles = getAllProfiles().map(p =>
    p.id === updatedProfile.id ? updatedProfile : p
  );
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles));
}

export function deleteProfile(id) {
  const profiles = getAllProfiles().filter(p => p.id !== id);
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles));
}
