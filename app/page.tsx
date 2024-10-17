import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

export default function Home() {
  return (
    <div className="mt-40 inline-grid grid-cols-4 items-center justify-center gap-2">
      <Button>hello</Button>
      <Button disabled>hello</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="outline">outline</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="muted">muted</Button>
      <Button variant="teritary">teritary</Button>

      <Input />
      <Select />
    </div>
  )
}
