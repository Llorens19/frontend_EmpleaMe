import { Routes } from '@angular/router';
import { ProfileResolver } from '../core/services/profile-resolver.service';
import { JobsResolverService } from '../core/services/jobs-resolver.service';

const profileRoutes: Routes = [
  {
    path: ':username',
    loadComponent: () => import('./profile.component').then(c => c.ProfileComponent),
    resolve: { profile: ProfileResolver },
    children: [
      {
        path: 'jobs',
        loadComponent: () => import('./ui/profile-jobs/profile-jobs.component').then(c => c.ProfileJobsComponent),

      },
    // {
      //   path: 'favorites',
      //   loadComponent: () => import('./profile-favorites.component').then(c => c.ProfileFavoritesComponent),
      // }
    ]
  },
  // {
  //   path: ':username/jobs',
  //   loadComponent: () => import('./ui/profile-jobs/profile-jobs.component').then(c => c.ProfileJobsComponent),
  // }

];

export default profileRoutes;
