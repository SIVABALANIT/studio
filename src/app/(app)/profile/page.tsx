
'use client';

import { useUser } from '@/hooks/use-user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Mail, MapPin, Twitter, Linkedin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="container mx-auto">
        <p>Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground text-lg">
          View and manage your personal information.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-3xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary font-bold">
                <Flame className="h-6 w-6" />
                <span className="text-2xl">{user.streak || 0} Day Streak</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-5 h-5" /> Contact Information
                </h3>
                <p>{user.contact || 'Not provided'}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" /> Location
                </h3>
                <p>{user.location || 'Not provided'}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-muted-foreground">
                  <Linkedin className="w-5 h-5" /> Social Profiles
                </h3>
                <div className="flex items-center gap-4">
                  {user.socials?.twitter && (
                    <a
                      href={`https://twitter.com/${user.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-primary"
                    >
                      <Twitter className="w-5 h-5" />
                      <span>{user.socials.twitter}</span>
                    </a>
                  )}
                  {user.socials?.linkedin && (
                    <a
                      href={`https://www.linkedin.com/in/${user.socials.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-primary"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {!user.socials?.twitter && !user.socials?.linkedin && (
                    <p>Not provided</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
