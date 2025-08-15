-- AddForeignKey
ALTER TABLE "public"."Invite" ADD CONSTRAINT "Invite_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
