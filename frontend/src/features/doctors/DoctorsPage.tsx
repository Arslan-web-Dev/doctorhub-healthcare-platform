import { Search, Star } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Panel } from '../../components/ui/Panel';

const doctors = [
  { name: 'Dr. Ayesha Khan', spec: 'Cardiology', city: 'Lahore', rating: 4.9, fee: 4500, exp: 12 },
  { name: 'Dr. Hamza Ali', spec: 'Neurology', city: 'Karachi', rating: 4.8, fee: 5200, exp: 10 },
  { name: 'Dr. Sana Malik', spec: 'Dermatology', city: 'Islamabad', rating: 4.7, fee: 3800, exp: 8 }
];

export function DoctorsPage() {
  return (
    <div className="space-y-4">
      <Panel>
        <div className="grid gap-3 md:grid-cols-[1fr_12rem_12rem_auto]">
          <label className="relative">
            <Search className="absolute left-3 top-3 text-foreground/45" size={18} />
            <input className="w-full rounded-md border border-border bg-background py-3 pl-10 pr-3" placeholder="Search by disease, treatment, or doctor" />
          </label>
          <input className="rounded-md border border-border bg-background px-3" placeholder="City" />
          <input className="rounded-md border border-border bg-background px-3" placeholder="Specialization" />
          <Button>Search</Button>
        </div>
      </Panel>
      <div className="grid gap-4 xl:grid-cols-3">
        {doctors.map((doctor) => (
          <Panel key={doctor.name}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">{doctor.name}</h2>
                <p className="text-primary">{doctor.spec}</p>
              </div>
              <span className="flex items-center gap-1 rounded-md bg-primary/15 px-2 py-1 text-sm text-primary">
                <Star size={14} /> {doctor.rating}
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div>
                <dt className="text-foreground/52">City</dt>
                <dd className="font-bold">{doctor.city}</dd>
              </div>
              <div>
                <dt className="text-foreground/52">Fee</dt>
                <dd className="font-bold">Rs {doctor.fee}</dd>
              </div>
              <div>
                <dt className="text-foreground/52">Exp</dt>
                <dd className="font-bold">{doctor.exp} yrs</dd>
              </div>
            </dl>
            <Button className="mt-5 w-full">Book Appointment</Button>
          </Panel>
        ))}
      </div>
    </div>
  );
}
