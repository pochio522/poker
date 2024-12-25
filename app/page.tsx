import { supabase } from "../utils/supabase";

export default async function Home() {
  // let { data: test2, error } = await supabase.from("test2").select("*");

  // let { data: test, error } = await supabase.from("test").select("*");

  // let { data: card, error } = await supabase.from("card").select("*");

  let { data: card, error } = await supabase //データべースから持ってきた値がcardかerrorに入る
    .from("card")
    .select("*")
    .eq("is_on_table", 0);
  console.log(card);

  // const upsertData = card.map((card) => ({
  //   id: card.id, // 更新対象を指定するためにIDを利用
  //   is_on_table: true, // 更新する値
  // }));

  // const { error: upsertError } = await supabase
  //   .from("card")
  //   .upsert(upsertData, { onConflict: "id" }); // idを基に更新
  // if (upsertError) {
  //   console.error("Error during upsert:", upsertError);
  //   return <div>Error during upsert</div>;
  // }
  // console.log("Upsert completed");

  return (
    <div className="flex gap-4 mx-4">
      <div className="w-1/2 flex flex-col gap-1">
        <div className="bg-green-400">Column Left Row 1</div>
        <div className="bg-green-400">Column Left Row 2</div>
        <div className="bg-green-400">Column Left Row 3</div>
      </div>
      <div className="w-1/2  flex flex-col gap-1">
        <div className="bg-blue-500">Column Right Row 1</div>
        <div className="bg-blue-500">Column Right Row 2</div>
        <div className="bg-blue-500">Column Right Row 3</div>
      </div>
    </div>
  );
}
