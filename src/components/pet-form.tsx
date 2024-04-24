"use client";

import { addPet } from "@/actions/actions";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./pet-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

function PetForm({ actionType, onFormSubmission }: PetFormProps) {
  const { selectedPet } = usePetContext();
  // const [error, formAction] = useFormState(addPet, {});

  return (
    <form
      // action={formAction}
      action={async (formData) => {
        const error = await addPet(formData);
        if (error) {
          toast.warning(error.message);
          return;
        }
        onFormSubmission();
      }}
      className="flex flex-col"
    >
      {/* {error && <p className="text-red-500">{error.message}</p>} */}
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            required
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            required
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
          />
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}

export default PetForm;
