
pub mod consts;
use std::env;
use crate::consts::*;
use std::time::Duration;

use serenity::futures::StreamExt;
use serenity::{async_trait, http};
use serenity::model::prelude::{Ready, RoleId, Role};
use serenity::prelude::*;
use serenity::model::channel::Message;
use serenity::framework::standard::macros::{check, command, group, help, hook};
use serenity::framework::standard::{
    help_commands,
    Args,
    CommandGroup,
    CommandOptions,
    CommandResult,
    DispatchError,
    HelpOptions,
    Reason,
    StandardFramework,
};

#[group]
#[only_in(guilds)]
#[commands(bing, swap_roles)]
struct General;

#[group]
#[checks(Owner)]
struct Owner;

struct Handler;

#[async_trait]
impl EventHandler for Handler {
    async fn ready(&self, ctx: Context, _: Ready) {
        // Wait some time for guilds to be received.
        //
        // You should keep track of this in a better fashion by tracking how
        // many guilds each `ready` has, and incrementing a counter on
        // GUILD_CREATEs. Once the number is equal, print the number of
        // unknown members.
        //
        // For demonstrative purposes we're just sleeping the thread for 5
        // seconds.
        tokio::time::sleep(Duration::from_secs(5)).await;

        println!("{} unknown members", ctx.cache.unknown_members());
    }
}       

#[tokio::main]
async fn main() {
    let framework = StandardFramework::new()
        .configure(|c| c.prefix("_>")) // set the bot's prefix to "~"
        .group(&GENERAL_GROUP);

    // Login with a bot token from the environment
    let token = env::var("DISCORD_TOKEN").expect("token");
    let intents = GatewayIntents::non_privileged() | GatewayIntents::MESSAGE_CONTENT;
    let mut client = Client::builder(token, intents)
        .event_handler(Handler)
        .framework(framework)
        .await
        .expect("Error creating client");

    // start listening for events by starting a single shard
    if let Err(why) = client.start().await {
        println!("An error occurred while running the client: {:?}", why);
    }
}

#[check]
#[name = "Owner"]
async fn owner_check(
    _: &Context,
    msg: &Message,
    _: &mut Args,
    _: &CommandOptions,
) -> Result<(), Reason> {


    if msg.author.id != 459180760377589760 { //Jax
        return Err(Reason::User("Lacked owner permission".to_string()));
    }

    Ok(())
}

//514268198485622797

#[command]
async fn bing(ctx: &Context, msg: &Message) -> CommandResult {
    msg.reply(ctx, "Bong!").await?;


    Ok(())
}
//sep

#[command]
async fn swap_roles(ctx: &Context, msg: &Message) -> CommandResult {

    //msg.reply(ctx, "beep boop testing the thing...").await?;
    msg.reply(&ctx.http, "Swapping all user roles..").await?;
    // let guild_id =

    // let members = guild.members.values();
    // let test_role = guild.role_by_name("Test").unwrap();
    // let test2_role = guild.role_by_name("Test2").unwrap();


    // members
    //     .filter(|m| m.roles.contains(&test_role.id))
    //     .for_each(|m| {
    //         m.remove_role(&ctx, test_role);
    //         m.add_role(&ctx, test2_role).now_or_never();
    //     });


    let guild_id = msg.guild_id.unwrap();
        let mut i = 0;
    let mut members = guild_id.members_iter(&ctx).boxed();
while let Some(member_result) = members.next().await {
    match member_result {
        Ok(member) => {
            i+=1;
            for i in &member.roles {
                match i {
                    &Pianist => {
                        member.to_owned().remove_role(&ctx.http, &Pianist).await?;
                        if !member.roles.contains(&MusicChannels) { 
                            member.to_owned().add_role(&ctx.http, &MusicChannels).await?;
                        }
                    },
                    &Composers => {
                        member.to_owned().remove_role(&ctx.http, &Composers).await?;
                        if !member.roles.contains(&MusicChannels) { 
                            member.to_owned().add_role(&ctx.http, &MusicChannels).await?;
                        }
                    },
                    &MusicProducer => {
                        member.to_owned().remove_role(&ctx.http, &MusicProducer).await?;
                        if !member.roles.contains(&MusicChannels) { 
                            member.to_owned().add_role(&ctx.http, &MusicChannels).await?;
                        }
                    },

                    &NoJudgement => {
                        member.to_owned().remove_role(&ctx.http, &NoJudgement).await?;
                        if !member.roles.contains(&SeriousDiscussions) && member.roles.contains(&RoleId(518943001431769105)) { 
                            member.to_owned().add_role(&ctx.http, &SeriousDiscussions).await?;
                        }
                    },
                    &Debates => {
                        member.to_owned().remove_role(&ctx.http, &Debates).await?;
                        if !member.roles.contains(&SeriousDiscussions) && member.roles.contains(&RoleId(518943001431769105)) { 
                            member.to_owned().add_role(&ctx.http, &SeriousDiscussions).await?;
                        }
                    },

                    &Stem => {
                        member.to_owned().remove_role(&ctx.http, &Stem).await?;
                        if !member.roles.contains(&ThoughtProvoking) { 
                            member.to_owned().add_role(&ctx.http, &ThoughtProvoking).await?;
                        }
                    }

                    &BirthdayCrew => {
                        member.to_owned().remove_role(&ctx.http, &BirthdayCrew).await?;
                        if !member.roles.contains(&SpecialCrews) {
                            member.to_owned().add_role(&ctx.http, &SpecialCrews).await?;
                        }
                    }
                    &WelcomeCrew => {
                        member.to_owned().remove_role(&ctx.http, &WelcomeCrew).await?;
                        if !member.roles.contains(&SpecialCrews) {
                            member.to_owned().add_role(&ctx.http, &SpecialCrews).await?;
                        }
                    }

                    &NotificationSquad => {
                        member.to_owned().remove_role(&ctx.http, &NotificationSquad).await?;
                        if !member.roles.contains(&CommunityUpdates) {
                            member.to_owned().add_role(&ctx.http, &CommunityUpdates).await?;
                        }
                    }

                    &Multilingual => {
                        member.to_owned().remove_role(&ctx.http, &Multilingual).await?;
                        if(!member.roles.contains(&SocialFun)) {
                            member.to_owned().add_role(&ctx.http, &SocialFun).await?;
                        }
                    }
                    _ => {
                        //do nothing
                    }
              
                }
                if(!member.roles.contains(&RoleId(518943001431769105)) && member.roles.contains(&SeriousDiscussions)) {
                    member.to_owned().remove_role(&ctx.http, &SeriousDiscussions);
                }
            }
            println!("{}", i );
        },
        Err(error) => eprintln!("Uh oh!  Error: {}", error),
    }
}
msg.reply(&ctx.http, "Done! Hopefully nothing is broken.").await?;
    Ok(())
} 
