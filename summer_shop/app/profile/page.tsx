import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Edit, Calendar } from "lucide-react";

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-extrabold mb-8">My Profile</h1>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-5">
              {user.imageUrl ? (
                <img src={user.imageUrl} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-4 border-orange-100 shadow" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-3xl font-bold text-orange-500 shadow">
                  {user.firstName?.charAt(0) ?? "U"}
                </div>
              )}
              <div>
                <CardTitle className="text-2xl">{user.firstName} {user.lastName}</CardTitle>
                <p className="text-muted-foreground text-sm mt-1">{user.emailAddresses[0]?.emailAddress}</p>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 space-y-5">
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-orange-500 shrink-0" />
              <span className="text-muted-foreground w-28">Full Name</span>
              <span className="font-medium">{user.firstName} {user.lastName}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-orange-500 shrink-0" />
              <span className="text-muted-foreground w-28">Email</span>
              <span className="font-medium">{user.emailAddresses[0]?.emailAddress}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-orange-500 shrink-0" />
              <span className="text-muted-foreground w-28">Joined</span>
              <span className="font-medium">{new Date(user.createdAt!).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>

            <Separator />
            <div className="flex gap-3 pt-2">
              <Button className="rounded-full bg-orange-500 hover:bg-orange-600" asChild>
                <Link href="/profile/update"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Link>
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
