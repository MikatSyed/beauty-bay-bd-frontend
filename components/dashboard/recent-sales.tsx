import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/diverse-woman-portrait.png" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jessica Lee</p>
          <p className="text-sm text-muted-foreground">jessica.lee@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$249.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/thoughtful-man.png" alt="Avatar" />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Michael Smith</p>
          <p className="text-sm text-muted-foreground">michael.smith@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$189.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/woman-with-glasses.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sarah Davis</p>
          <p className="text-sm text-muted-foreground">sarah.davis@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/bearded-man-portrait.png" alt="Avatar" />
          <AvatarFallback>JW</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">James Wilson</p>
          <p className="text-sm text-muted-foreground">james.wilson@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$129.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/red-haired-woman.png" alt="Avatar" />
          <AvatarFallback>EC</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Emma Clark</p>
          <p className="text-sm text-muted-foreground">emma.clark@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$169.00</div>
      </div>
    </div>
  )
}
