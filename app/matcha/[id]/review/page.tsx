import ReviewForm from "@/components/ReviewForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const Review = async ({ params }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) {
    return <div className="p-6 text-red-600">Product ID not found.</div>;
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Write a Review
          </h2>
          {user && <ReviewForm matchaId={id} userId={user.id} />}
        </div>
      </div>
    </div>
  );
};

export default Review;
