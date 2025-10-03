"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/profile/profile-form";
import { SecuritySettings } from "@/components/profile/security-settings";
import { useUpdateLoggedUserMutation,useLoggedUserQuery } from "@/redux/api/userApi";
import { useToast } from "@/components/ui/use-toast";



export default function ProfilePage() {
  const { data, isLoading, error } = useLoggedUserQuery(undefined);
  const [updateLoggedUser, { isLoading: isUpdating }] = useUpdateLoggedUserMutation();

  const { toast } = useToast();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (data?.data) setUser(data.data);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-2">
        <p className="text-red-500 font-medium">Failed to load profile data.</p>
        <p className="text-sm text-muted-foreground">Please refresh or try again later.</p>
        <Link href="/" className="text-pink-500 font-medium mt-2 underline">Go back to Home</Link>
      </div>
    );
  }

  const handleProfileUpdate = async (values: any) => {
    try {
     const result =  await updateLoggedUser({ id: user._id, body: values }).unwrap();
     console.log(result,'52')
      toast({ title: "Profile updated", description: "Your profile has been updated.", className: "bg-pink-500 text-white" });
    } catch (err: any) {
      toast({ title: "Update failed", description: err?.data?.message || "Something went wrong", variant: "destructive" });
    }
  };

  const handleChangePassword = async (values: any) => {
   
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-pink-500 font-medium underline">← Back to Home</Link>
        <h2 className="text-3xl font-bold tracking-tight text-pink-600">Profile</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[420px] bg-pink-50 rounded-lg p-1">
          <TabsTrigger value="general" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-lg">
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-lg">
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-lg">
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-pink-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-pink-600">Profile Information</CardTitle>
              <CardDescription>Update your personal information and avatar.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm user={user} onSubmit={handleProfileUpdate} isUpdating={isUpdating} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-pink-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-pink-600">Security Settings</CardTitle>
              <CardDescription>Manage your password and security options.</CardDescription>
            </CardHeader>
            <CardContent>
              <SecuritySettings id={user?._id} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="notifications" className="space-y-6">
          <Card className="border-pink-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-pink-600">Notification Preferences</CardTitle>
              <CardDescription>Control how you receive alerts and updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
